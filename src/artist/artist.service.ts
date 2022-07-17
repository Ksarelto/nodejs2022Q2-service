import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { updateObject } from 'src/common/update.object';
import { modifyDB, addToStore } from 'src/db/modify.db';
import { findAll, findById, getAllData } from 'src/db/find.db';
import { ResponseArtistDto } from './dto/response-artist.dto';

@Injectable()
export class ArtistService {
  async create(createArtistDto: CreateArtistDto) {
    const id = uuidv4();
    const newArtist = { ...createArtistDto, id };
    await addToStore('artists', newArtist);
    return newArtist;
  }

  async findAll() {
    const allArtists = await findAll('artists');
    return allArtists;
  }

  async findOne(id: string) {
    const artist = await findById('artists', id);
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artists = (await findAll('artists')) as ResponseArtistDto[];
    const artist = await findById('artists', id);
    const updatedArtist = updateObject(artist, updateArtistDto);
    const updatedArtists = artists.map((artist) => {
      if (artist.id === id) {
        return updatedArtist;
      }
      return artist;
    });

    await modifyDB({ artists: updatedArtists });
    return updatedArtist;
  }

  async remove(id: string) {
    const { artists, tracks, albums, favourites } = await getAllData();
    await findById('artists', id);
    const newAlbums = albums.map((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
      return album;
    });

    const newTracks = tracks.map((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
      return track;
    });

    const filteredArtists = artists.filter((artist) => artist.id !== id);
    const newArtists = favourites.artists.filter((artistId) => artistId !== id);
    favourites.artists = newArtists;

    await modifyDB({
      tracks: newTracks,
      albums: newAlbums,
      artists: filteredArtists,
      favourites,
    });
  }
}
