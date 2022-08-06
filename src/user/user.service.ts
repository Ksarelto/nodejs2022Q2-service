import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './dto/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { EntUser } from './entity/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { errorMessage } from 'src/common/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(EntUser)
    private userRepository: Repository<EntUser>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdAt = String(Date.now());
    const { login, password } = createUserDto;
    const user = new User(1, createdAt, createdAt, login, password);
    const userDb = await this.userRepository.save(user);
    return User.toResponse(userDb);
  }

  async findAll() {
    const allUsers = await this.userRepository.find();
    const mapedUsers = allUsers.map((user) => {
      return User.toResponse(user);
    });
    return mapedUsers;
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOneOrFail({ id });
      return User.toResponse(user);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(errorMessage.NO_USER, HttpStatus.NOT_FOUND);
      }
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOneOrFail(id);

      if (user.password !== updateUserDto.oldPassword) {
        throw new Error('wrong pass');
      }

      const updatedUser = new User(
        user.version + 1,
        String(user.createdAt),
        String(Date.now()),
        user.login,
        updateUserDto.newPassword,
        id,
      );

      await this.userRepository.save({ ...updatedUser, id });
      return User.toResponse(updatedUser);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(errorMessage.NO_USER, HttpStatus.NOT_FOUND);
      }

      if (e instanceof Error) {
        throw new HttpException(errorMessage.WRONG_PASS, HttpStatus.FORBIDDEN);
      }
    }
  }

  async remove(id: string) {
    try {
      await this.userRepository.findOneOrFail(id);
      await this.userRepository.delete(id);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(errorMessage.NO_USER, HttpStatus.NOT_FOUND);
      }
    }
  }
}
