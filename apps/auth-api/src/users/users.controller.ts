import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/RegisterUser.dto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/get')
  async findAll(@Res() res: any) {
    const user: object = await this.usersService.findAll();
    return res.status(HttpStatus.OK).json(user);
  }

  @Post('/register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async registerUser(
    @Body() registerUserDto: RegisterUserDto,
    @Res() res: any,
  ) {
    const user: User = await this.usersService.registerUser(registerUserDto);
    await this.usersService.addUid(user.id);
    return res.status(HttpStatus.OK).json();
  }
}
