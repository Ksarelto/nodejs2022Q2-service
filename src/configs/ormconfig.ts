import { ConnectionOptions } from 'typeorm';
import { ENV_VARIABLES } from './env.config';
import { databaseType } from '../common/constants';
import { EntUser } from '../user/entity/user.entity';
import { EntAlbum } from '../album/entity/album.entity';
import { EntArtist } from '../artist/entity/artist.entity';
import { EntTrack } from '../track/entity/track.entity';
import { EntFavourites } from '../favourites/entity/favourites.entity';

const connectionData: ConnectionOptions = {
  type: databaseType,
  host: ENV_VARIABLES.POSTRGES_HOST,
  port: ENV_VARIABLES.POSTRGES_PORT ? +ENV_VARIABLES.POSTRGES_PORT : 5432,
  username: ENV_VARIABLES.POSTGRES_NAME,
  password: ENV_VARIABLES.POSTGRES_PASSWORD,
  database: ENV_VARIABLES.POSTGRES_DB,
  entities: [EntUser, EntAlbum, EntArtist, EntTrack, EntFavourites],
  synchronize: false,
  migrations: ['./dist/db/migrations/*.js'],
  migrationsRun: false,
  cli: {
    migrationsDir: 'db/migrations',
  },
  logging: false,
  dropSchema: false,
};

export default connectionData;
