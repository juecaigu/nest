import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UnloginFilter } from 'src/common/unlogin.filter';

@Injectable()
export class LoginService {
  login(request: Request) {
    const headers = request.headers;
    if (!headers.authorization) {
      throw new UnloginFilter('login first');
    }
    return 'login success';
  }
}
