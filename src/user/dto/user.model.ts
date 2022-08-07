import * as bcrypt from 'bcrypt';
import { passwordStrength } from 'src/common/constants';
import { ENV_VARIABLES } from 'src/configs/env.config';

export class User {
  constructor(
    public readonly version: number,
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly login: string,
    public readonly password: string,
    public readonly id?: string,
    public readonly refreshToken?: string,
  ) {}

  static toResponse = (user: User) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { refreshToken, password, createdAt, updatedAt, ...rest } = user;
    return {
      createdAt: Number(createdAt),
      updatedAt: Number(updatedAt),
      ...rest,
    };
  };

  static createUser = (login: string, password: string) => {
    const createdAt = String(Date.now());
    const hashPassword = bcrypt.hashSync(password, +ENV_VARIABLES.CRYPT_SALT);
    return new User(1, createdAt, createdAt, login, hashPassword);
  };

  static toDataBaseWithToken = (user: User, refreshToken: string) => {
    const { createdAt, updatedAt, ...rest } = user;
    return {
      createdAt: String(createdAt),
      updatedAt: String(updatedAt),
      ...rest,
      refreshToken,
    };
  };
}
