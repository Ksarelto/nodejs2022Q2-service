import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntUser } from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EntUser])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
