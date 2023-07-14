import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Get("/:email")
    async getUserByEmail(@Param('email') email: string, @Res() res: any){
        const user: object = await this.usersService.getUserByEmail(email);
        return res.status(HttpStatus.OK).json(user);
    }
}
