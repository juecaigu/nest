import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import {
  Observable,
  catchError,
  timeout,
  TimeoutError,
  throwError,
} from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(3000),
      catchError((err) => {
        console.log(err);
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => new InternalServerErrorException());
      }),
    );
  }
}
