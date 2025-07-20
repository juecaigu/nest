import { Inject, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
// import { Article } from './entities/article.entity';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ArticleService {
  @InjectEntityManager()
  private entityManager: EntityManager;
  @Inject(ConfigService)
  private configService: ConfigService;
  init() {
    // const a1 = new Article();
    // a1.title = '夏日经济“热力”十足 “点燃”文旅消费新活力';
    // a1.content =
    //   '人民网北京6月17日电 （高清扬）高考结束、暑期将至，各地文旅市场持续火热，暑期出游迎来热潮。热气腾腾的“夏日经济”成为消费活力升级的缩影，展示出我国文旅产业的持续发展势头。';
    // const a2 = new Article();
    // a2.title = '科学把握全面深化改革的方法要求';
    // a2.content =
    //   '科学的方法是做好一切工作的重要保证。全面深化改革是一场复杂而深刻的社会变革，必须运用科学方法才能取得成功。';
    // await this.entityManager.save(Article, a1);
    // await this.entityManager.save(Article, a2);
    const config = this.configService.get('type') as string;
    console.log('config1111', config);
    return config;
  }

  create(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article';
  }

  findAll() {
    return `This action returns all article`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
