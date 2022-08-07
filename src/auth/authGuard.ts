import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { ENV_VARIABLES } from '../configs/env.config';
import { errorMessage } from 'src/common/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token = this.getTokenFromHeader(context);
    jwt.verify(token, ENV_VARIABLES.JWT_SECRET_KEY, (err) => {
      if (err)
        throw new HttpException(
          errorMessage.INVALID_TOKEN,
          HttpStatus.UNAUTHORIZED,
        );
    });
    return true;
  }
  private getTokenFromHeader(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const tokenHeader = req.headers.authorization?.split(' ');
    if (!tokenHeader)
      throw new HttpException(
        errorMessage.EMPTY_TOKEN,
        HttpStatus.UNAUTHORIZED,
      );
    const [bearer, token] = tokenHeader as string[];
    if (bearer !== 'Bearer' || !token)
      throw new HttpException(
        errorMessage.EMPTY_TOKEN,
        HttpStatus.UNAUTHORIZED,
      );
    if (!ENV_VARIABLES.JWT_SECRET_KEY)
      throw new HttpException(errorMessage.NO_SECRET, HttpStatus.NOT_FOUND);
    return token;
  }
}
