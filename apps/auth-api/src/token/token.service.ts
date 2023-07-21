import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { hashGenerator } from '../helper/hashGenerator';
import { generateAccessToken } from './helper/generateAccessToken';

@Injectable()
export class TokenService {
  @Inject(UsersService)
  private readonly usersService: UsersService;

  async generateAccessToken(
    account: string,
    password: string,
  ): Promise<string> {
    const user: object = await this.usersService.getUserByAccount(account);

    if (!user) throw new Error('User does not exist');

    const givenPasswordHash = hashGenerator(password, user['salt']);

    if (givenPasswordHash !== user['password'])
      throw new Error('Password is not correct');

    return generateAccessToken(user);
  }
}
