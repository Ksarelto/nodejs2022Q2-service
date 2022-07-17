import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsInt()
  version: number;

  @IsNotEmpty()
  @IsInt()
  createdAt: number;

  @IsNotEmpty()
  @IsInt()
  updatedAt: number;
}
