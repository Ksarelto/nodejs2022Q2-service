import { EntAlbum } from '../../album/entity/album.entity';
import { EntArtist } from '../../artist/entity/artist.entity';
import { EntTrack } from '../../track/entity/track.entity';
import { Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EntFavourites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => EntArtist, (artist) => artist.favourites)
  @JoinColumn({ name: 'artists' })
  artists!: EntArtist[];

  @OneToMany(() => EntAlbum, (album) => album.favourites)
  @JoinColumn({ name: 'albums' })
  albums!: EntAlbum[];

  @OneToMany(() => EntTrack, (track) => track.favourites)
  @JoinColumn({ name: 'tracks' })
  tracks: EntTrack[];

  static toResponse(favs: EntFavourites) {
    const { id, ...rest } = favs;
    Object.values(rest).forEach((v) => {
      v.forEach((o) => delete o.favourites);
    });
    return rest;
  }
}
