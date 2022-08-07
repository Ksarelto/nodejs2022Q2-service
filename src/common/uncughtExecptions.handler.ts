import Logger from '../logger/winston.logger';

export const uncaughtExeptionsHandler = (err: Error): void => {
  Logger.crit(err.message);
};
