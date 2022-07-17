import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((object, value) => value !== null)
  artistId: string;
}
