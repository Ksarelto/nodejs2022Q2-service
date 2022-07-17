import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './dto/user.model';
import { findAll, findUser } from 'src/db/find.db';
import { modifyDB, addToStore } from 'src/db/modify.db';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    const id = uuidv4();
    const createdAt = Date.now();
    const { login, password } = createUserDto;
    const user = new User(id, 1, createdAt, createdAt, login, password);
    await addToStore('users', user);
    return User.toResponse(user);
  }

  async findAll() {
    const allUsers = await findAll('users');
    const mapedUsers = (allUsers as User[]).map((user) => {
      return User.toResponse(user);
    });
    return mapedUsers;
  }

  async findOne(id: string) {
    const user = await findUser(id);
    return User.toResponse(user as User);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const users = await findAll('users');
    const user = await findUser(id, updateUserDto.oldPassword);
    const updatedUser = new User(
      id,
      user.version + 1,
      user.createdAt,
      Date.now(),
      user.login,
      updateUserDto.newPassword,
    );

    const updatedUsers = (users as User[]).map((user) => {
      if (user.id === id) {
        return updatedUser;
      }

      return user;
    });

    modifyDB({ users: updatedUsers });
    return User.toResponse(updatedUser);
  }

  async remove(id: string) {
    const users = await findAll('users');
    await findUser(id);
    const filteredUsers = (users as User[]).filter((user) => user.id !== id);
    modifyDB({ users: filteredUsers });
  }
}
