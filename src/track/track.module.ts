import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntTrack } from './entity/track.entity';
import { EntArtist } from '../artist/entity/artist.entity';
import { EntAlbum } from '../album/entity/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EntTrack, EntArtist, EntAlbum])],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
