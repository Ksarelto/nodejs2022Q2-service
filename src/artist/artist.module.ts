import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntArtist } from './entity/artist.entity';
import { EntAlbum } from 'src/album/entity/album.entity';
import { EntTrack } from 'src/track/entity/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EntArtist, EntTrack, EntAlbum])],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
