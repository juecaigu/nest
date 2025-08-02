import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(private readonly jwtService: JwtService) {}

  login(body: { username: string; password: string }) {
    const { username } = body;
    const token = this.jwtService.sign({ username });
    return { token };
  }

  getUserInfo(token: string) {
    try {
      const { username } = this.jwtService.verify<{ username: string }>(token);
      console.log('getUserInfo', username);
      return { code: 200, data: { username } };
    } catch (error) {
      console.log('getUserInfo error', error);
      return {
        code: 401,
        message: 'token 过期',
      };
    }
  }
}
