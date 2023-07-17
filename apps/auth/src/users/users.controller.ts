import { Body, Controller, Get, HttpStatus, Param, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/RegisterUser.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Get("/get")
    async findAll(@Res() res: any) {
        const user: object = await this.usersService.findAll();
        return res.status(HttpStatus.OK).json(user);
    }

    @Post("/register")
    @UsePipes(new ValidationPipe({ transform: true }))
    async registerUser(@Body() registerUserDto: RegisterUserDto, @Res() res: any) {
        const user: object = await this.usersService.registerUser(registerUserDto);
        return res.status(HttpStatus.OK).json(user);
    }
}
