import { ResponseAlbumDto } from 'src/album/dto/response-album.dto';
import { ResponseArtistDto } from 'src/artist/dto/response-artist.dto';
import { FavouritesModel } from 'src/favourites/dto/favourites.model';
import { ResponseTrackDto } from 'src/track/dto/response-track.dto';
import { User } from 'src/user/dto/user.model';

export class DatabaseModel {
  artists: ResponseArtistDto[];
  users: User[];
  albums: ResponseAlbumDto[];
  tracks: ResponseTrackDto[];
  favourites: FavouritesModel;
}
