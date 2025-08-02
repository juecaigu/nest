import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as qrcode from 'qrcode';
import { RedisService } from 'src/redis/redis.service';
import { QrcodeStatus } from 'src/type';

@Injectable()
export class QrcodeService {
  @Inject(RedisService)
  private readonly redisService: RedisService;
  async generate() {
    const uuid = randomUUID();
    const url = `http://localhost:3000/pages/confirm.html?qrcode_id=${uuid}`;
    const dataUrl = await qrcode.toDataURL(url);
    const result = {
      qrcode_id: uuid,
      url: dataUrl,
      status: QrcodeStatus.NO_SCAN,
    };
    await this.redisService.hashSet(uuid, result, 10 * 60);
    return result;
  }
  async check(qrcode_id: string) {
    const result = await this.redisService.hashGet(qrcode_id);
    if (!result.qrcode_id || result.status === QrcodeStatus.EXPIRED) {
      return {
        code: 400,
        message: '二维码已过期',
        status: result.status,
      };
    }
    return { code: 200, status: result.status };
  }
  async scan(qrcode_id: string) {
    const result = await this.redisService.hashGet(qrcode_id);
    if (result.qrcode_id && result.status === QrcodeStatus.NO_SCAN) {
      await this.redisService.hashSet(
        qrcode_id,
        {
          ...result,
          status: QrcodeStatus.SCANNED,
        },
        1 * 60,
      );
    }
    return { code: 200, message: '二维码已扫描' };
  }
  async confirm(qrcode_id: string) {
    const result = await this.redisService.hashGet(qrcode_id);
    if (result.qrcode_id && result.status === QrcodeStatus.SCANNED) {
      await this.redisService.hashSet(qrcode_id, {
        ...result,
        status: QrcodeStatus.CONFIRMED,
      });
    }
    return { code: 200, message: '二维码已确认' };
  }
  async cancel(qrcode_id: string) {
    const result = await this.redisService.hashGet(qrcode_id);
    if (result.qrcode_id && result.status === QrcodeStatus.NO_SCAN) {
      await this.redisService.hashSet(
        qrcode_id,
        {
          ...result,
          status: QrcodeStatus.CANCELLED,
        },
        1 * 60,
      );
    }
    return { code: 200, message: '二维码已取消' };
  }
}
