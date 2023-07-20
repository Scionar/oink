import { IsNotEmpty } from 'class-validator';

export class CreateAccessTokenDto {
  @IsNotEmpty()
  account: string;

  @IsNotEmpty()
  password: string;
}
