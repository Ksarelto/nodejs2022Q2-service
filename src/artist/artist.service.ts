import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntArtist } from './entity/artist.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { errorMessage } from 'src/common/constants';

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
      await this.artistRepository.findOneOrFail(id);
      const updatedArtist = await this.artistRepository.save({
        ...updateArtistDto,
        id,
      });
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
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(errorMessage.NO_USER, HttpStatus.NOT_FOUND);
      }
    }
  }
}
