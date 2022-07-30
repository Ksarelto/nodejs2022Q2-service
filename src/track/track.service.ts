import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { updateObject } from '../common/update.object';
import { InjectRepository } from '@nestjs/typeorm';
import { EntTrack } from './entity/track.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { EntAlbum } from '../album/entity/album.entity';
import { EntArtist } from '../artist/entity/artist.entity';
import { errorMessage } from 'src/common/constants';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(EntTrack)
    private trackRepository: Repository<EntTrack>,
    @InjectRepository(EntArtist)
    private artistRepository: Repository<EntArtist>,
    @InjectRepository(EntAlbum)
    private albumRepository: Repository<EntAlbum>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    createTrackDto.albumId &&
      (await this.albumRepository.findOneOrFail(createTrackDto.albumId));

    createTrackDto.artistId &&
      (await this.artistRepository.findOneOrFail(createTrackDto.artistId));

    const track = await this.trackRepository.save(createTrackDto);
    return track;
  }

  async findAll() {
    const allTracks = await this.trackRepository.find();
    return allTracks;
  }

  async findOne(id: string) {
    try {
      const track = await this.trackRepository.findOneOrFail(id);
      return track;
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(errorMessage.NO_USER, HttpStatus.NOT_FOUND);
      }
    }
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    try {
      const track = await this.trackRepository.findOneOrFail(id);

      updateTrackDto.albumId &&
        (await this.albumRepository.findOneOrFail(updateTrackDto.albumId));

      updateTrackDto.artistId &&
        (await this.artistRepository.findOneOrFail(updateTrackDto.artistId));

      const updatedTrack = this.trackRepository.save(
        updateObject(track, updateTrackDto),
      );

      return updatedTrack;
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(errorMessage.NO_USER, HttpStatus.NOT_FOUND);
      }
    }
  }

  async remove(id: string) {
    try {
      await this.trackRepository.findOneOrFail(id);
      await this.trackRepository.delete(id);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(errorMessage.NO_USER, HttpStatus.NOT_FOUND);
      }
    }
  }
}
