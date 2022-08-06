import * as dotenv from 'dotenv';
dotenv.config();

export const ENV_VARIABLES = {
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTRGES_PORT: process.env.POSTRGES_PORT,
  POSTGRES_NAME: process.env.POSTGRES_NAME,
  POSTRGES_HOST: process.env.POSTRGES_HOST,
  POSTGRES_PASSWORD: 'testbase',
  PORT: process.env.PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_SECRET_REFRESH_KEY: process.env.JWT_SECRET_REFRESH_KEY,
  TOKEN_EXPIRE_TIME: process.env.TOKEN_EXPIRE_TIME,
  TOKEN_REFRESH_EXPIRE_TIME: process.env.TOKEN_REFRESH_EXPIRE_TIME,
  CRYPT_SALT: process.env.CRYPT_SALT,
};
