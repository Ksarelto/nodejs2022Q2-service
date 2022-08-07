import { Module } from '@nestjs/common';
import { FavouritesModule } from './favourites/favourites.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import configOptions from './configs/ormconfig';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './common/error.handler';
import { LoggingInterceptor } from './logger/interceptor.logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FavouritesModule,
    ArtistModule,
    AlbumModule,
    UserModule,
    TrackModule,
    TypeOrmModule.forRoot(configOptions),
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
