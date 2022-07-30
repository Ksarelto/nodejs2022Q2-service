import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { updateObject } from '../common/update.object';
import { InjectRepository } from '@nestjs/typeorm';
import { EntArtist } from './entity/artist.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { errorMessage } from 'src/common/constants';
import { EntAlbum } from 'src/album/entity/album.entity';
import { EntTrack } from 'src/track/entity/track.entity';
import { updateEntity } from 'src/common/fetchDoc';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(EntArtist)
    private artistRepository: Repository<EntArtist>,
    @InjectRepository(EntAlbum)
    private albumRepository: Repository<EntAlbum>,
    @InjectRepository(EntTrack)
    private trackRepository: Repository<EntTrack>,
  ) {}
  async create(createArtistDto: CreateArtistDto) {
    const artist = await this.artistRepository.save(createArtistDto);
    return artist;
  }

  async findAll() {
    const allArtists = await this.artistRepository.find();
    return allArtists;
  }

  async findOne(id: string) {
    try {
      const artist = await this.artistRepository.findOneOrFail(id);
      return artist;
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(errorMessage.NO_USER, HttpStatus.NOT_FOUND);
      }
    }
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    try {
      const artist = await this.artistRepository.findOneOrFail(id);
      const updatedArtist = await this.artistRepository.save(
        updateObject(artist, updateArtistDto),
      );
      return updatedArtist;
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(errorMessage.NO_USER, HttpStatus.NOT_FOUND);
      }
    }
  }

  async remove(id: string) {
    try {
      await this.artistRepository.findOneOrFail(id);
      await this.artistRepository.delete(id);
      const tracks = await this.trackRepository.find({
        where: { artistId: id },
      });
      await updateEntity(tracks, 'artistId', this.trackRepository);
      const albums = await this.albumRepository.find({
        where: { artistId: id },
      });
      await updateEntity(albums, 'artistId', this.albumRepository);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(errorMessage.NO_USER, HttpStatus.NOT_FOUND);
      }
    }
  }
}
