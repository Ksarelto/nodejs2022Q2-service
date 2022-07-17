import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { updateObject } from 'src/common/update.object';
import { modifyDB, addToStore } from 'src/db/modify.db';
import { findAll, findById, getAllData } from 'src/db/find.db';
import { ResponseAlbumDto } from './dto/response-album.dto';

@Injectable()
export class AlbumService {
  async create(createAlbumDto: CreateAlbumDto) {
    const id = uuidv4();

    createAlbumDto.artistId &&
      (await findById('artists', createAlbumDto.artistId));

    const newAlbum = { ...createAlbumDto, id };
    await addToStore('albums', newAlbum);
    return newAlbum;
  }

  async findAll() {
    const allAlbums = await findAll('albums');
    return allAlbums;
  }

  async findOne(id: string) {
    const album = await findById('albums', id);
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albums = (await findAll('albums')) as ResponseAlbumDto[];
    const album = await findById('albums', id);

    updateAlbumDto.artistId &&
      (await findById('artists', updateAlbumDto.artistId));

    const updatedAlbum = updateObject(album, updateAlbumDto);

    const updatedAlbums = albums.map((album) => {
      if (album.id === id) {
        return updatedAlbum;
      }
      return album;
    });

    await modifyDB({ albums: updatedAlbums });
    return updatedAlbum;
  }

  async remove(id: string) {
    const { albums, tracks, favourites } = await getAllData();
    await findById('albums', id);
    const newTracks = tracks.map((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
      return track;
    });

    const filteredAlbums = albums.filter((album) => album.id !== id);
    const newAlbums = favourites.albums.filter((albumId) => albumId !== id);
    favourites.albums = newAlbums;

    await modifyDB({
      tracks: newTracks,
      albums: filteredAlbums,
      favourites,
    });
  }
}
