import { EntFavourites } from '../../favourites/entity/favourites.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class EntAlbum {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  year!: number;

  @Column({ nullable: true })
  artistId!: string | null;

  @ManyToOne(() => EntFavourites, (favourites) => favourites.albums, {
    nullable: true,
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @Exclude()
  favourites: EntFavourites;
}
