import { LoggerService } from '@nestjs/common';
import Logger from './winston.logger';

export class CustomLogger implements LoggerService {
  log(message: string) {
    Logger.info(message);
  }

  info(message: string) {
    Logger.info(message);
  }

  error(message: string) {
    Logger.error(message);
  }

  warn(message: string) {
    Logger.warn(message);
  }

  debug(message: string) {
    Logger.debug(message);
  }

  verbose(message: string) {
    Logger.verbose(message);
  }
}
