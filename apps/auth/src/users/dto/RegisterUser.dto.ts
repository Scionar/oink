import { IsDate, IsDateString, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  account: string;

  @IsEmail()
  email: string;

  @IsDateString()
  birthday: Date;

  @IsNotEmpty()
  password: string;
}