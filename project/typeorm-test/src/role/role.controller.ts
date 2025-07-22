import {
  Body,
  Controller,
  Inject,
  Post,
  Res,
  ValidationPipe,
  UseGuards,
  Get,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { RegistryDto } from './dto/registry.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { roleGuard } from './role.guard';

@Controller('role')
export class RoleController {
  @Inject(RoleService)
  private readonly roleService: RoleService;
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const find = await this.roleService.login(loginDto);
    let token = '';
    if (find) {
      token = await this.jwtService.signAsync({
        id: find.id,
        username: find.username,
      });
      res.setHeader('token', `Bearer ${token}`);
      return res.json({
        message: '登录成功',
      });
    }
    return res.json({
      message: '用户名密码错误',
    });
  }

  @Post('register')
  register(@Body(ValidationPipe) registryDto: RegistryDto) {
    return this.roleService.register(registryDto);
  }

  @Get('test')
  @UseGuards(roleGuard)
  test() {
    return 'test';
  }
}
