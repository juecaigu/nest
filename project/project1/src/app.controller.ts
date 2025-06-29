import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login/login.guard';
import { Roles } from './common/roles.decorator';

@Controller('api/app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  @UseGuards(LoginGuard)
  @Roles(['admin'])
  getHello(): string {
    return this.appService.getHello();
  }
}
