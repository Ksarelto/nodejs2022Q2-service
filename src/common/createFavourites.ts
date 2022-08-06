import { getRepository } from 'typeorm';
import { EntFavourites } from '../favourites/entity/favourites.entity';

export const createFavourites = async () => {
  const [favs] = await getRepository(EntFavourites).find();
  if (!favs) {
    const newFavs = {
      artists: [],
      albums: [],
      tracks: [],
    };
    await getRepository(EntFavourites).save(newFavs);
  }
};
