import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntAlbum } from './entity/album.entity';
import { EntArtist } from '../artist/entity/artist.entity';
import { EntTrack } from 'src/track/entity/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EntAlbum, EntArtist, EntTrack])],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
