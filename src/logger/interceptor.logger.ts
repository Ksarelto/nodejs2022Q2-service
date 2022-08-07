import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import Logger from './winston.logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(() => {
        const message = this.createInfoMessage(context);
        Logger.http(message);
      }),
    );
  }

  createInfoMessage(context: ExecutionContext): string {
    const { params, method, body, url } = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();
    return `
    Method: ${JSON.stringify(method)}
    URL: ${JSON.stringify(url)}
    Params: ${params ? JSON.stringify(params) : 'empty'}
    Body: ${JSON.stringify(body)}
    Status Code: ${statusCode}
    `;
  }
}
