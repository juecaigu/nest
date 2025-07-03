import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    // // ExecutionContext 继承了 ArgumentsHost 接口 , 可以进行host类型的判断，然后
    // // 获取对应的上下文
    // const hostType = context.getType();
    // if (hostType === 'http') {
    //   const ctx = context.switchToHttp();
    //   const request = ctx.getRequest<Request>();
    //   const response = ctx.getResponse<Response>();
    //   response.status(403).json({
    //     message: '没有权限',
    //   });
    // } else if (hostType === 'ws') {
    //   const ctx = context.switchToWs();
    // } else if (hostType === 'rpc') {
    //   const ctx = context.switchToRpc();
    // }
    // const request = context.switchToHttp().getRequest();
    return roles[0] === 'admin';
  }
}
