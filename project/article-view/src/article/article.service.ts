import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class ArticleService {
  @InjectRepository(Article)
  private readonly articleRepository: Repository<Article>;
  @Inject(RedisService)
  private readonly redisService: RedisService;

  async setFlag(key: string) {
    await this.redisService.set(key, 1, 10 * 60);
  }

  async view(id: number, userId: number) {
    const savekey = `article_${id}`;
    const key = `user_${userId}_article_${id}`;
    const res = await this.redisService.hashGet(savekey);
    if (res?.readCount !== undefined) {
      const sameUser = await this.redisService.get(key);
      if (sameUser) {
        return { count: +res.readCount };
      }
      const newCount = Number(res.readCount) + 1;
      await this.redisService.hashSet(`article_${id}`, {
        ...res,
        readCount: newCount,
      });
      await this.setFlag(key);
      return { count: newCount };
    } else {
      const article = await this.articleRepository.findOne({ where: { id } });
      if (!article) {
        throw new NotFoundException('文章不存在');
      }
      article.readCount++;
      await this.articleRepository.update(
        { id },
        { readCount: article.readCount },
      );
      await this.redisService.hashSet(savekey, {
        likeCount: article.likeCount,
        readCount: article.readCount,
      });
      await this.setFlag(key);
      return { count: article.readCount };
    }
  }

  findAll() {
    return this.articleRepository.find();
  }

  async flushRedisToDB() {
    const keys = await this.redisService.keys('article_*');
    for (const key of keys) {
      const res = await this.redisService.hashGet(key);
      const id = key.split('_')[1];
      await this.articleRepository.update(
        { id: +id },
        { readCount: +res.readCount },
      );
    }
  }
}
