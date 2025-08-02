import { Controller, Get, Query } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';

@Controller('qrcode')
export class QrcodeController {
  constructor(private readonly qrcodeService: QrcodeService) {}

  @Get('generate')
  async generate(): Promise<{
    qrcode_id: string;
    url: string;
    status: string;
  }> {
    return await this.qrcodeService.generate();
  }

  @Get('check')
  async check(@Query('qrcode_id') qrcode_id: string) {
    return await this.qrcodeService.check(qrcode_id);
  }

  @Get('scan')
  async scan(@Query('qrcode_id') qrcode_id: string) {
    return await this.qrcodeService.scan(qrcode_id);
  }

  @Get('confirm')
  async confirm(@Query('qrcode_id') qrcode_id: string) {
    return await this.qrcodeService.confirm(qrcode_id);
  }

  @Get('cancel')
  async cancel(@Query('qrcode_id') qrcode_id: string) {
    return await this.qrcodeService.cancel(qrcode_id);
  }
}
