import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { hashGenerator } from '../helper/hashGenerator';
import { generateAccessToken } from './helper/generateAccessToken';
import { User } from '../users/user.entity';

@Injectable()
export class TokenService {
  @Inject(UsersService)
  private readonly usersService: UsersService;

  async generateAccessToken(
    username: string,
    password: string,
  ): Promise<string> {
    const user: User = await this.usersService.getUserByUsername(username);

    if (!user) throw new Error('User does not exist');

    const givenPasswordHash = hashGenerator(password, user.salt);

    if (givenPasswordHash !== user.password)
      throw new Error('Password is not correct');

    return generateAccessToken(user.uuid);
  }
}
