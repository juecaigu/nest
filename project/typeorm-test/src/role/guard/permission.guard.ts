/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RoleService } from '../role.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject()
  private readonly roleService: RoleService;
  @Inject(JwtService)
  private readonly jwtService: JwtService;
  @Inject(Reflector)
  private readonly reflector: Reflector;
  @Inject(RedisService)
  private readonly redisService: RedisService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authorization = request.header('Authorization') || '';
    const bearer = authorization.split(' ');
    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException('用户无权限！');
    }
    const token = bearer[1];
    try {
      const info: { username: string } = this.jwtService.verify(token);
      const key = `role_${info.username}_permission`;
      let permissions = await this.redisService.listGet(key);
      console.log('==========', permissions);
      if (!permissions.length) {
        const findRole = await this.roleService.findByUsername(info.username);
        permissions = findRole?.permissions.map((p) => p.name) || [];
        await this.redisService.listSet(key, permissions, 30 * 60);
      }
      const permission = this.reflector.get<string>(
        'permission',
        context.getHandler(),
      );
      if (permissions.some((p) => p === permission)) {
        return true;
      }
      throw new UnauthorizedException('用户无权限！');
    } catch (_) {
      throw new UnauthorizedException('用户无权限！');
    }
  }
}
