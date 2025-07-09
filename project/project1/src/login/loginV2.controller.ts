import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginGuard } from './login.guard';
import { Request } from 'express';

@Controller({
  path: 'api',
  version: '2',
})
export class LoginV2Controller {
  constructor(private readonly loginService: LoginService) {}

  @Get('login')
  @UseGuards(LoginGuard)
  @SetMetadata('roles', ['admin'])
  login() {
    return 'this is login v2';
  }
}
