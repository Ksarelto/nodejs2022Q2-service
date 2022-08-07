import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createFavourites } from './common/createFavourites';
import { CustomLogger } from './logger/custom.logger';
import { uncaughtExeptionsHandler } from './common/uncughtExecptions.handler';

process.on('uncaughtException', (err) => {
  uncaughtExeptionsHandler(err);
});

process.on('unhandledRejection', (err) => {
  uncaughtExeptionsHandler(err as Error);
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
  await createFavourites();
}
bootstrap();
