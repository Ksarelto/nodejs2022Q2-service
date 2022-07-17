import { Injectable } from '@nestjs/common';
import { findItemsById } from 'src/common/findItemById';
import { findById, getAllData } from 'src/db/find.db';
import { modifyDB, addToFavourites } from 'src/db/modify.db';

@Injectable()
export class FavouritesService {
  async findAll() {
    const { favourites, tracks, artists, albums } = await getAllData();
    const allTracks = findItemsById({ items: tracks, ids: favourites.tracks });
    const allAlbums = findItemsById({ items: albums, ids: favourites.albums });
    const allArtists = findItemsById({
      items: artists,
      ids: favourites.artists,
    });
    return {
      artists: allArtists,
      tracks: allTracks,
      albums: allAlbums,
    };
  }

  async addTrack(id: string) {
    await findById('tracks', id, true);
    await addToFavourites('tracks', id);
  }

  async removeTrack(id: string) {
    const { favourites } = await getAllData();
    await findById('tracks', id);
    const updatedTracks = favourites.tracks.filter((track) => track !== id);
    favourites.tracks = updatedTracks;
    modifyDB({ favourites });
  }

  async addAlbum(id: string) {
    await findById('albums', id, true);
    await addToFavourites('albums', id);
  }

  async removeAlbum(id: string) {
    const { favourites } = await getAllData();
    await findById('albums', id);
    const updatedAlbums = favourites.albums.filter((album) => album !== id);
    favourites.albums = updatedAlbums;
    modifyDB({ favourites });
  }

  async addArtist(id: string) {
    await findById('artists', id, true);
    await addToFavourites('artists', id);
  }

  async removeArtist(id: string) {
    const { favourites } = await getAllData();
    await findById('artists', id);
    const updatedArtists = favourites.artists.filter((artist) => artist !== id);
    favourites.artists = updatedArtists;
    modifyDB({ favourites });
  }
}
