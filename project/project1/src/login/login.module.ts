import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { APP_FILTER } from '@nestjs/core';
import { UnloginException } from 'src/common/unlogin.filter';
import { LoginV2Controller } from './loginV2.controller';

@Module({
  imports: [],
  controllers: [LoginV2Controller, LoginController],
  providers: [
    LoginService,
    {
      provide: APP_FILTER,
      useClass: UnloginException,
    },
  ],
})
export class LoginModule {}
