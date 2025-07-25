import {
  Controller,
  Get,
  Req,
  SetMetadata,
  UseGuards,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginGuard } from './login.guard';
import { Request } from 'express';

@Controller({
  path: 'api',
  version: VERSION_NEUTRAL,
})
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get('login')
  @UseGuards(LoginGuard)
  @SetMetadata('roles', ['admin'])
  login(@Req() request: Request) {
    return this.loginService.login(request);
  }
}
