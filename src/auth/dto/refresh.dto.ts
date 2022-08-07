import { IsNotEmpty, IsUUID } from 'class-validator';

export class RefreshDto {
  @IsUUID()
  @IsNotEmpty()
  refreshToken: string;
}
