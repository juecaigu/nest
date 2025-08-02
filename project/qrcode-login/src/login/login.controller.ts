import { Body, Controller, Post, Headers, Get } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('api')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    return this.loginService.login(body);
  }

  @Get('userInfo')
  getUserInfo(@Headers('Authorization') token: string) {
    return this.loginService.getUserInfo(token);
  }
}
