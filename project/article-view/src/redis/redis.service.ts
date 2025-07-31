import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private readonly redisClient: RedisClientType;

  async get(key: string) {
    return await this.redisClient.get(key);
  }

  async set(key: string, value: string | number, ttl?: number) {
    await this.redisClient.set(key, value);
    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }

  async hashGet(key: string) {
    return await this.redisClient.hGetAll(key);
  }

  async hashSet(
    key: string,
    value: Record<string, string | number>,
    ttl?: number,
  ) {
    for (const name in value) {
      await this.redisClient.hSet(key, name, value[name]);
    }
    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }

  async keys(pattern: string) {
    return await this.redisClient.keys(pattern);
  }
}
