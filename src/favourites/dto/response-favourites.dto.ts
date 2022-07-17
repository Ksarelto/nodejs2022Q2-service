import { ResponseAlbumDto } from 'src/album/dto/response-album.dto';
import { ResponseArtistDto } from 'src/artist/dto/response-artist.dto';
import { ResponseTrackDto } from 'src/track/dto/response-track.dto';

export class ResponseFavourites {
  artists: ResponseArtistDto[];
  tracks: ResponseTrackDto[];
  albums: ResponseAlbumDto[];
}
