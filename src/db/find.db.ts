import { HttpException, HttpStatus } from '@nestjs/common';
import { errorMessage } from 'src/common/constants';
import { DatabaseModel } from './db.model';
import { User } from 'src/user/dto/user.model';
import * as db from './db.json';

interface IDataType {
  id: string;
}

const getAllData = (): Promise<DatabaseModel> =>
  new Promise((resolve) => resolve(db.data));

const findUser = (id: string, oldPassword?: string): Promise<User> => {
  return new Promise((resolve) => {
    const user: User = db.data.users.find((user) => user.id === id);

    if (!user) {
      throw new HttpException(errorMessage.NO_USER, HttpStatus.NOT_FOUND);
    }

    if (oldPassword && user.password !== oldPassword) {
      throw new HttpException(errorMessage.WRONG_PASS, HttpStatus.FORBIDDEN);
    }

    resolve(user as User);
  });
};

const findById = (key: string, id: string, isInFav?: boolean) => {
  return new Promise((resolve) => {
    const item = db.data[key].find((data: IDataType) => data.id === id);

    if (isInFav && !item) {
      throw new HttpException(
        errorMessage.tracks,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!item) {
      throw new HttpException(errorMessage[key], HttpStatus.NOT_FOUND);
    }

    resolve(item);
  });
};

const findAll = (key: string) => {
  return new Promise((resolve) => {
    try {
      resolve(db.data[key]);
    } catch (err) {
      resolve(err);
    }
  });
};

export { findById, findAll, findUser, getAllData };
