import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

interface JwtUserData {
  username: string;
  userId: number;
}

declare module 'express' {
  interface Request {
    user: JwtUserData;
  }
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  login(@Req() req: Request) {
    console.log('req', req.user);
    const payload = { username: req.user.username, userId: req.user.userId };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '60s' }),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }

  // @Get('login')
  // @UseGuards(AuthGuard('github'))
  // login() {
  //   return 'login';
  // }

  // @Get('callback')
  // @UseGuards(AuthGuard('github'))
  // callback(@Req() req: { user: { id: string } }) {
  //   const user = this.appService.findUserByGithubId(req.user.id);
  //   return user;
  // }
}
