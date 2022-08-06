import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntAlbum } from '../album/entity/album.entity';
import { EntArtist } from '../artist/entity/artist.entity';
import { EntTrack } from '../track/entity/track.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { EntFavourites } from './entity/favourites.entity';
import { errorMessage } from 'src/common/constants';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectRepository(EntFavourites)
    private favouritesRepository: Repository<EntFavourites>,
    @InjectRepository(EntTrack)
    private trackRepository: Repository<EntTrack>,
    @InjectRepository(EntArtist)
    private artistRepository: Repository<EntArtist>,
    @InjectRepository(EntAlbum)
    private albumRepository: Repository<EntAlbum>,
  ) {}
  async findAll() {
    const [favourites] = await this.favouritesRepository.find({
      relations: ['artists', 'tracks', 'albums'],
    });
    return EntFavourites.toResponse(favourites);
  }

  async addTrack(id: string) {
    try {
      const track = await this.trackRepository.findOneOrFail(id);
      const [favourites] = await this.favouritesRepository.find({
        relations: ['artists', 'tracks', 'albums'],
      });
      favourites.tracks.push(track);
      await this.favouritesRepository.save(favourites);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          errorMessage.tracks,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
  }

  async removeTrack(id: string) {
    try {
      await this.trackRepository.findOneOrFail(id);
      const [favourites] = await this.favouritesRepository.find({
        relations: ['artists', 'tracks', 'albums'],
      });
      const updatedTracks = favourites.tracks.filter(
        (track) => track.id !== id,
      );
      favourites.tracks = updatedTracks;
      await this.favouritesRepository.save(favourites);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          errorMessage.tracks,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
  }

  async addAlbum(id: string) {
    try {
      const album = await this.albumRepository.findOneOrFail(id);
      const [favourites] = await this.favouritesRepository.find({
        relations: ['artists', 'tracks', 'albums'],
      });
      favourites.albums.push(album);
      await this.favouritesRepository.save(favourites);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          errorMessage.tracks,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
  }

  async removeAlbum(id: string) {
    try {
      await this.albumRepository.findOneOrFail(id);
      const [favourites] = await this.favouritesRepository.find({
        relations: ['artists', 'tracks', 'albums'],
      });
      const updatedAlbums = favourites.albums.filter(
        (album) => album.id !== id,
      );
      favourites.albums = updatedAlbums;
      await this.favouritesRepository.save(favourites);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          errorMessage.tracks,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
  }

  async addArtist(id: string) {
    try {
      const artist = await this.artistRepository.findOneOrFail(id);
      const [favourites] = await this.favouritesRepository.find({
        relations: ['artists', 'tracks', 'albums'],
      });
      favourites.artists.push(artist);
      await this.favouritesRepository.save(favourites);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          errorMessage.tracks,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
  }

  async removeArtist(id: string) {
    try {
      await this.artistRepository.findOneOrFail(id);
      const [favourites] = await this.favouritesRepository.find({
        relations: ['artists', 'tracks', 'albums'],
      });
      const updatedArtists = favourites.artists.filter(
        (artist) => artist.id !== id,
      );
      favourites.artists = updatedArtists;
      await this.favouritesRepository.save(favourites);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          errorMessage.tracks,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
  }
}
