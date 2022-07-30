import { EntFavourites } from '../../favourites/entity/favourites.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class EntTrack {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  artistId: string | null;

  @Column({ nullable: true })
  albumId: string | null;

  @Column()
  duration!: number;

  @ManyToOne(() => EntFavourites, (favourites) => favourites.tracks, {
    nullable: true,
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @Exclude()
  favourites: EntFavourites;
}
