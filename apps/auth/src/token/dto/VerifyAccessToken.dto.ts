import { IsNotEmpty } from 'class-validator';

export class VerifyAccessTokenDto {
  @IsNotEmpty()
  accessToken: string;
}
