import { ResponseAlbumDto } from '../../album/dto/response-album.dto';
import { ResponseArtistDto } from '../../artist/dto/response-artist.dto';
import { ResponseTrackDto } from '../../track/dto/response-track.dto';

export class ResponseFavourites {
  artists: ResponseArtistDto[];
  tracks: ResponseTrackDto[];
  albums: ResponseAlbumDto[];
}
