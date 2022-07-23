import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class ResponseArtistDto {
  @IsNotEmpty()
  @IsUUID(4)
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  grammy: number;
}
