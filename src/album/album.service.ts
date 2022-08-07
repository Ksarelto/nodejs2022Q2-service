import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntAlbum } from './entity/album.entity';
import { Repository } from 'typeorm';
import { EntArtist } from '../artist/entity/artist.entity';
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
    const album = await this.albumRepository.findOneOrFail(id);
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    await this.albumRepository.findOneOrFail(id);
    const artist = await findOne({
      id: updateAlbumDto.artistId,
      repo: this.artistRepository,
    });
    const result = { ...updateAlbumDto, artist, id };
    const modifiedAlbum = await this.albumRepository.save(result);
    return modifiedAlbum;
  }

  async remove(id: string) {
    await this.albumRepository.findOneOrFail(id);
    await this.albumRepository.delete(id);
  }
}
