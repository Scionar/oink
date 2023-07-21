import { IsDateString, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsDateString()
  birthday: Date;

  @IsNotEmpty()
  password: string;
}
