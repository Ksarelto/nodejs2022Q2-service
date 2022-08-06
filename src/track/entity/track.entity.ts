import { EntFavourites } from '../../favourites/entity/favourites.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { EntAlbum } from '../../album/entity/album.entity';
import { EntArtist } from '../../artist/entity/artist.entity';

@Entity()
export class EntTrack {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  artistId: string | null;

  @OneToOne(() => EntArtist, {
    nullable: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  artist: EntArtist;

  @Column({ nullable: true })
  albumId: string | null;

  @OneToOne(() => EntAlbum, {
    nullable: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  album: EntAlbum;

  @Column()
  duration!: number;

  @ManyToOne(() => EntFavourites, (favourites) => favourites.tracks, {
    nullable: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  favourites: EntFavourites;
}
