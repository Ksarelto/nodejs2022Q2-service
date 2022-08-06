import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntArtist } from './entity/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EntArtist])],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
