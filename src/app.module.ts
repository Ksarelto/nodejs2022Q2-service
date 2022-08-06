import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FavouritesModule } from './favourites/favourites.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configOptions from './configs/ormconfig';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
