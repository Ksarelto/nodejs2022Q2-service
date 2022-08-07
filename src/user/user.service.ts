import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './dto/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { EntUser } from './entity/user.entity';
import { Repository } from 'typeorm';
import { errorMessage } from 'src/common/constants';
import * as bcrypt from 'bcrypt';
import { ENV_VARIABLES } from 'src/configs/env.config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(EntUser)
    private userRepository: Repository<EntUser>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    const user = User.createUser(login, password);
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
    const user = await this.userRepository.findOneOrFail({ id });
    return User.toResponse(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneOrFail(id);
    const isEqualPass = bcrypt.compareSync(
      updateUserDto.oldPassword,
      user.password,
    );

    if (!isEqualPass) {
      throw new HttpException(errorMessage.WRONG_PASS, HttpStatus.FORBIDDEN);
    }

    const updatedUser = new User(
      user.version + 1,
      String(user.createdAt),
      String(Date.now()),
      user.login,
      bcrypt.hashSync(updateUserDto.newPassword, +ENV_VARIABLES.CRYPT_SALT),
      id,
    );

    await this.userRepository.save({ ...updatedUser, id });
    return User.toResponse(updatedUser);
  }

  async remove(id: string) {
    await this.userRepository.findOneOrFail(id);
    await this.userRepository.delete(id);
  }
}
