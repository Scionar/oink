import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAccessTokenDto } from './dto/CreateAccessToken.dto';
import { UsersService } from '../users/users.service';
import { hashGenerator } from '../helper/hashGenerator';
import { generateAccessToken } from './helper/generateAccessToken';
import { verifyAccessToken } from './helper/verifyAccessToken';
import { VerifyAccessTokenDto } from './dto/VerifyAccessToken.dto';

@Controller('token')
export class TokenController {
  constructor(private usersService: UsersService) {}

  @Post('/create')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createToken(
    @Body() createAccessTokenDto: CreateAccessTokenDto,
    @Res() res: any,
  ) {
    const user: object = await this.usersService.getUserByAccount(
      createAccessTokenDto.account,
    );
    if (!user) return res.status(HttpStatus.UNAUTHORIZED);

    const givenPasswordHash = hashGenerator(
      createAccessTokenDto.password,
      user['salt'],
    );

    if (givenPasswordHash !== user['password'])
      return res.status(HttpStatus.UNAUTHORIZED);

    const accessToken = generateAccessToken(user);

    return res.status(HttpStatus.OK).json({ accessToken });
  }

  @Post('/verify')
  @UsePipes(new ValidationPipe({ transform: true }))
  async verifyToken(
    @Body() verifyAccessTokenDto: VerifyAccessTokenDto,
    @Res() res: any,
  ) {
    const verified = verifyAccessToken(verifyAccessTokenDto.accessToken);

    return res.status(HttpStatus.OK).json({ verified });
  }
}
