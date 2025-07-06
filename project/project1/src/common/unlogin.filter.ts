import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';

export class UnloginFilter extends Error {
  message: string;
  constructor(message?: string) {
    super(message);
    this.message = message || 'unlogin';
  }
}

@Catch(UnloginFilter)
export class UnloginException implements ExceptionFilter {
  catch(exception: UnloginFilter, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    console.log('request', request);
    console.log('response', response);
    response
      .status(HttpStatus.UNAUTHORIZED)
      .json({
        code: HttpStatus.UNAUTHORIZED,
        message: 'fail',
        data: exception.message,
      })
      .end();
  }
}
