import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntArtist } from './entity/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(EntArtist)
    private artistRepository: Repository<EntArtist>,
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
    const artist = await this.artistRepository.findOneOrFail(id);
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    await this.artistRepository.findOneOrFail(id);
    const updatedArtist = await this.artistRepository.save({
      ...updateArtistDto,
      id,
    });
    return updatedArtist;
  }

  async remove(id: string) {
    await this.artistRepository.findOneOrFail(id);
    await this.artistRepository.delete(id);
  }
}
