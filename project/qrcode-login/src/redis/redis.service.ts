import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { QrcodeResult, QrcodeStatus } from 'src/type';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private readonly redisClient: RedisClientType;

  async get(key: string) {
    return await this.redisClient.get(key);
  }

  async set(key: string, value: string, ttl?: number) {
    if (ttl) {
      await this.redisClient.set(key, value, { EX: ttl });
    } else {
      await this.redisClient.set(key, value);
    }
  }

  async hashGet(key: string): Promise<QrcodeResult> {
    const result = await this.redisClient.hGetAll(key);
    return {
      qrcode_id: result.qrcode_id,
      url: result.url,
      status: result.status as QrcodeStatus,
    };
  }

  async hashSet(key: string, value: QrcodeResult, ttl?: number) {
    for (const name in value) {
      await this.redisClient.hSet(key, name, value[name]);
    }
    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }

  async keys() {
    return await this.redisClient.keys('*');
  }
}
