import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntAlbum } from './entity/album.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { EntArtist } from '../artist/entity/artist.entity';
import { errorMessage } from '../common/constants';
import { EntTrack } from '../track/entity/track.entity';
import { findOne } from '../common/repositoryMethods';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(EntAlbum)
    private albumRepository: Repository<EntAlbum>,
    @InjectRepository(EntArtist)
    private artistRepository: Repository<EntArtist>,
    @InjectRepository(EntTrack)
    private trackRepository: Repository<EntTrack>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    await findOne({ id: createAlbumDto.artistId, repo: this.artistRepository });
    const newAlbum = await this.albumRepository.save(createAlbumDto);
    return newAlbum;
  }

  async findAll() {
    const albums = await this.albumRepository.find();
    return albums;
  }

  async findOne(id: string) {
    try {
      const album = await this.albumRepository.findOneOrFail(id);
      return album;
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(errorMessage.NO_USER, HttpStatus.NOT_FOUND);
      }
    }
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    try {
      await this.albumRepository.findOneOrFail(id);
      const artist = await findOne({
        id: updateAlbumDto.artistId,
        repo: this.artistRepository,
      });
      const result = { ...updateAlbumDto, artist, id };
      const modifiedAlbum = await this.albumRepository.save(result);
      return modifiedAlbum;
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(errorMessage.NO_USER, HttpStatus.NOT_FOUND);
      }
    }
  }

  async remove(id: string) {
    try {
      await this.albumRepository.findOneOrFail(id);
      await this.albumRepository.delete(id);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(errorMessage.NO_USER, HttpStatus.NOT_FOUND);
      }
    }
  }
}
