import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CarMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('CarMiddleware before');
    next();
    console.log('CarMiddleware after');
  }
}
