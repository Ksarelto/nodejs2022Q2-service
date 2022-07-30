import * as dotenv from 'dotenv';
dotenv.config();

export const ENV_VARIABLES = {
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTRGES_PORT: process.env.POSTRGES_PORT,
  POSTGRES_NAME: process.env.POSTGRES_NAME,
  POSTRGES_HOST: process.env.POSTRGES_HOST,
  POSTGRES_PASSWORD: 'testbase',
  PORT: process.env.PORT,
};
