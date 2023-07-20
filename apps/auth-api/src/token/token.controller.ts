import path from 'path';
import fs from 'fs';
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
import { VerifyAccessTokenDto } from './dto/VerifyAccessToken.dto';
import { verifyAccessToken } from 'auth-verification';

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
    const publicKeyPath = path.resolve(__dirname, '../../../', 'public.pem');
    let publicKey: string;

    if (!fs.existsSync(publicKeyPath))
      throw new Error('Public key does not exist');

    try {
      publicKey = fs.readFileSync(publicKeyPath, 'utf8');
    } catch (err) {
      throw new Error('Failed to read public key');
    }

    const verified = verifyAccessToken(
      verifyAccessTokenDto.accessToken,
      publicKey,
    );

    return res.status(HttpStatus.OK).json({ verified });
  }
}
