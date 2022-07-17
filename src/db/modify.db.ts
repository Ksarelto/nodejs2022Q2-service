import { ResponseAlbumDto } from 'src/album/dto/response-album.dto';
import { ResponseArtistDto } from 'src/artist/dto/response-artist.dto';
import { FavouritesModel } from 'src/favourites/dto/favourites.model';
import { ResponseTrackDto } from 'src/track/dto/response-track.dto';
import { User } from 'src/user/dto/user.model';
import * as db from './db.json';

interface IModules {
  tracks?: ResponseTrackDto[];
  albums?: ResponseAlbumDto[];
  artists?: ResponseArtistDto[];
  favourites?: FavouritesModel;
  users?: User[];
}

const modifyDB = (modules: IModules) => {
  return new Promise((resolve, reject) => {
    try {
      Object.keys(modules).forEach((moduleName) => {
        db.data[moduleName] = modules[moduleName];
      });
      resolve('Success');
    } catch (err) {
      reject('Failed');
    }
  });
};

const addToStore = (key: string, data: any) => {
  return new Promise((resolve) => {
    db.data[key].push(data);
    resolve(data);
  });
};

const addToFavourites = (field: string, data: any) => {
  return new Promise((resolve) => {
    db.data.favourites[field].push(data);
    resolve('Success');
  });
};

export { modifyDB, addToStore, addToFavourites };
