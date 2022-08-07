import { ENV_VARIABLES } from 'src/configs/env.config';
import * as winston from 'winston';
import DailyRotateFile = require('winston-daily-rotate-file');
import { LogLevelsObject, LogColorsObject } from '../common/constants';

export const setLogLevel = (level: string | undefined): string => {
  switch (level) {
    case '0':
      return 'crit';
    case '1':
      return 'error';
    case '2':
      return 'warn';
    case '3':
      return 'info';
    default:
      return 'http';
  }
};

winston.addColors(LogColorsObject);

const Logger = winston.createLogger({
  level: setLogLevel(ENV_VARIABLES.LOGGING_LEVEL),
  levels: LogLevelsObject,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.printf((info) => {
          const { message, level } = info;
          return `${level}: ${message}`;
        }),
      ),
    }),

    new DailyRotateFile({
      filename: 'error-%DATE%.txt',
      datePattern: 'hh-mm',
      dirname: 'src/logger/logs',
      maxSize: ENV_VARIABLES.MAX_LOG_FILE_SIZE,
      level: 'error',
      handleRejections: true,
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        winston.format.uncolorize(),
        winston.format.printf((info) => {
          const { timestamp, message, level } = info;
          return `Creating time: ${timestamp}
${level.toUpperCase()}: ${message}`;
        }),
      ),
    }),
    new DailyRotateFile({
      filename: 'allLogs-%DATE%.txt',
      datePattern: 'hh-mm',
      dirname: 'src/logger/logs',
      maxSize: ENV_VARIABLES.MAX_LOG_FILE_SIZE,
      format: winston.format.printf(
        (info) => `${info.level.toUpperCase()}: ${info.message}`,
      ),
    }),
  ],
});

Logger.on('error', (err: Error) => {
  Logger.error(err);
});

export default Logger;
