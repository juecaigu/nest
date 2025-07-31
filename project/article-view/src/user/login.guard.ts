import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

declare module 'express' {
  interface Request {
    user: { id: number };
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization;
    if (!token) {
      throw new UnauthorizedException('请先登录');
    }
    try {
      const payload = this.jwtService.verify<{ id: number }>(token);
      request.user = { id: payload.id };
      return true;
    } catch (error) {
      console.log('error', error);
      throw new UnauthorizedException('请先登录');
    }
  }
}
