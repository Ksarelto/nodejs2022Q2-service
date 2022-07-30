import { EntFavourites } from '../../favourites/entity/favourites.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class EntArtist {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  grammy!: boolean;

  @ManyToOne(() => EntFavourites, (favourites) => favourites.artists, {
    nullable: true,
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  favourites: EntFavourites;
}
