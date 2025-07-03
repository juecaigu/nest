import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginGuard } from './login.guard';

@Controller('api')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get('login')
  @UseGuards(LoginGuard)
  @SetMetadata('roles', ['admin'])
  login() {
    return 'login';
  }
}
