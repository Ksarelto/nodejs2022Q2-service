import { Optional } from '@nestjs/common';
import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ResponseTrackDto {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @Optional()
  artistId: string | null;

  @Optional()
  albumId: string | null;

  @IsNotEmpty()
  @IsInt()
  duration: number;
}
