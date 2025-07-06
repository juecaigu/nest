import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { APP_FILTER } from '@nestjs/core';
import { UnloginException } from 'src/common/unlogin.filter';

@Module({
  imports: [],
  controllers: [LoginController],
  providers: [
    LoginService,
    {
      provide: APP_FILTER,
      useClass: UnloginException,
    },
  ],
})
export class LoginModule {}
