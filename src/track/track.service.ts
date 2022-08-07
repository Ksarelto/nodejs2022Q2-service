import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntTrack } from './entity/track.entity';
import { Repository } from 'typeorm';
import { EntAlbum } from '../album/entity/album.entity';
import { EntArtist } from '../artist/entity/artist.entity';
import { findOne } from 'src/common/repositoryMethods';

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
    await findOne({ id: createTrackDto.albumId, repo: this.albumRepository });
    await findOne({ id: createTrackDto.artistId, repo: this.artistRepository });
    const track = await this.trackRepository.save(createTrackDto);
    return track;
  }

  async findAll() {
    const allTracks = await this.trackRepository.find();
    return allTracks;
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOneOrFail(id);
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    await this.trackRepository.findOneOrFail(id);
    const artist = await findOne({
      id: updateTrackDto.artistId,
      repo: this.artistRepository,
    });
    const album = await findOne({
      id: updateTrackDto.albumId,
      repo: this.albumRepository,
    });
    const updatedTrack = await this.trackRepository.save({
      ...updateTrackDto,
      artist,
      album,
      id,
    });

    return updatedTrack;
  }

  async remove(id: string) {
    await this.trackRepository.findOneOrFail(id);
    await this.trackRepository.delete(id);
  }
}
