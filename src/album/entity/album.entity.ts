import { EntFavourites } from '../../favourites/entity/favourites.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { EntArtist } from '../../artist/entity/artist.entity';

@Entity()
export class EntAlbum {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  year!: number;

  @Column({ nullable: true })
  artistId: string | null;

  @OneToOne(() => EntArtist, {
    nullable: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  artist: EntArtist;

  @ManyToOne(() => EntFavourites, (favourites) => favourites.albums, {
    nullable: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  favourites: EntFavourites;
}
