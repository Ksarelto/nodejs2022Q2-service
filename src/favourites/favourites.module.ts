import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntFavourites } from './entity/favourites.entity';
import { EntTrack } from '../track/entity/track.entity';
import { EntArtist } from '../artist/entity/artist.entity';
import { EntAlbum } from '../album/entity/album.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EntFavourites, EntTrack, EntArtist, EntAlbum]),
  ],
  controllers: [FavouritesController],
  providers: [FavouritesService],
})
export class FavouritesModule {}
