import { IsNotEmpty } from 'class-validator';

export class CreateAccessTokenDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
