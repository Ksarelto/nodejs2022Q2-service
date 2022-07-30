import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { updateObject } from '../common/update.object';
import { InjectRepository } from '@nestjs/typeorm';
import { EntAlbum } from './entity/album.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { EntArtist } from '../artist/entity/artist.entity';
import { errorMessage } from 'src/common/constants';
import { EntTrack } from 'src/track/entity/track.entity';
import { updateEntity } from 'src/common/fetchDoc';

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
    createAlbumDto.artistId &&
      (await this.artistRepository.findOneOrFail(createAlbumDto.artistId));
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
      const album = await this.albumRepository.findOneOrFail(id);

      updateAlbumDto.artistId &&
        (await this.artistRepository.findOneOrFail(updateAlbumDto.artistId));

      const modifiedAlbum = await this.albumRepository.save(
        updateObject(album, updateAlbumDto),
      );

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
      const tracks = await this.trackRepository.find({
        where: { albumId: id },
      });
      await updateEntity(tracks, 'albumId', this.trackRepository);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(errorMessage.NO_USER, HttpStatus.NOT_FOUND);
      }
    }
  }
}
