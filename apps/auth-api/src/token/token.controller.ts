import path from 'path';
import fs from 'fs';
import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAccessTokenDto } from './dto/CreateAccessToken.dto';
import { VerifyAccessTokenDto } from './dto/VerifyAccessToken.dto';
import { verifyAccessToken } from 'auth-verification';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  @Inject(TokenService)
  private readonly tokenService: TokenService;

  @Post('/create')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createToken(
    @Body() createAccessTokenDto: CreateAccessTokenDto,
    @Res() res: any,
  ) {
    let accessToken;

    try {
      accessToken = await this.tokenService.generateAccessToken(
        createAccessTokenDto.username,
        createAccessTokenDto.password,
      );
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED);
    }

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
