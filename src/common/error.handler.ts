import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import Logger from 'src/logger/winston.logger';
import { EntityNotFoundError } from 'typeorm';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = this.checkExeptionInstance(exception);
    const message = this.createErrorMessage(exception, status);

    if (status === HttpStatus.BAD_REQUEST) {
      Logger.warn(message);
    } else {
      Logger.error(message);
    }

    return response
      .status(status)
      .send(this.returnResponse(exception, status, request.url));
  }

  private checkExeptionInstance(err: unknown) {
    if (err instanceof EntityNotFoundError) return HttpStatus.NOT_FOUND;
    else if (err instanceof HttpException) return err.getStatus();
    else return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private createErrorMessage(err: Error, status: number) {
    return `
      Name: ${JSON.stringify(err.name)}
      Message: ${JSON.stringify(err.message)}
      Stack: ${JSON.stringify(err.stack)}
      Status Code: ${JSON.stringify(status)}
   `;
  }

  private returnResponse(exception: Error, status?: number, path?: string) {
    if (exception instanceof BadRequestException)
      return exception.getResponse();
    return {
      statusCode: status,
      name: exception.name,
      message: exception.message,
      path,
    };
  }
}
