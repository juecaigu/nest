import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './common/roles.decorator';

@Controller('api/app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  @Roles(['admin'])
  getHello(): string {
    return this.appService.getHello();
  }
}
