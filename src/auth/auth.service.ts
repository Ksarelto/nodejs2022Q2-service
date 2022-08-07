import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { RefreshDto } from './dto/refresh.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntUser } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { errorMessage } from '../common/constants';
import { JwtService } from '@nestjs/jwt';
import { ENV_VARIABLES } from 'src/configs/env.config';
import { User } from 'src/user/dto/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(EntUser)
    private userRepository: Repository<EntUser>,
    private jwtService: JwtService,
  ) {}
  async signup(signupDto: SignupDto) {
    const { login, password } = signupDto;
    const newUser = User.createUser(login, password);
    const user = await this.userRepository.save(newUser);
    return User.toResponse(user);
  }

  async login(loginDto: LoginDto) {
    const { login, password } = loginDto;
    const user = await this.userRepository.findOne({ login });
    const validatePassword = bcrypt.compareSync(password, user.password);

    if (!validatePassword || !user)
      throw new HttpException(errorMessage.ERR_AUTH, HttpStatus.FORBIDDEN);

    const tokens = this.generateTokens(user.id, user.login);
    await this.userRepository.save({ ...user, refreshToken: tokens.refToken });
    return tokens;
  }

  async refresh(refreshDto: RefreshDto) {
    if (!refreshDto.refreshToken) {
      throw new HttpException(errorMessage.NO_REFRESH, HttpStatus.UNAUTHORIZED);
    }

    this.varifyRefreshToken(refreshDto.refreshToken);

    const user = await this.userRepository.findOneOrFail({
      refreshToken: refreshDto.refreshToken,
    });

    const tokens = this.generateTokens(user.id, user.password);
    await this.userRepository.save({ ...user, refreshToken: tokens.refToken });
    return tokens;
  }

  private varifyRefreshToken(refToken: string) {
    try {
      this.jwtService.verify(refToken, {
        secret: ENV_VARIABLES.JWT_SECRET_REFRESH_KEY,
      });
    } catch (e) {
      throw new HttpException(errorMessage.INVALID_TOKEN, HttpStatus.FORBIDDEN);
    }
  }

  private generateTokens(id: string, login: string) {
    const payload = { id, login };
    const {
      JWT_SECRET_KEY,
      JWT_SECRET_REFRESH_KEY,
      TOKEN_EXPIRE_TIME,
      TOKEN_REFRESH_EXPIRE_TIME,
    } = ENV_VARIABLES;

    const accessToken = this.jwtService.sign(payload, {
      secret: JWT_SECRET_KEY,
      expiresIn: TOKEN_EXPIRE_TIME,
    });

    const refToken = this.jwtService.sign(payload, {
      secret: JWT_SECRET_REFRESH_KEY,
      expiresIn: TOKEN_REFRESH_EXPIRE_TIME,
    });

    return {
      accessToken,
      refToken,
    };
  }
}
