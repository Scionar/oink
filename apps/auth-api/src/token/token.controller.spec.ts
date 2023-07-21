import { Test, TestingModule } from '@nestjs/testing';
import { TokenController } from './token.controller';
import { TypeORMMySqlTestingModule } from '../../test/setup';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { TokenService } from './token.service';

describe('TokenController', () => {
  let testModule: TestingModule;
  let controller: TokenController;

  beforeEach(async () => {
    testModule = await Test.createTestingModule({
      imports: [
        TypeORMMySqlTestingModule([User]),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UsersService, TokenService],
      controllers: [TokenController],
    }).compile();

    controller = new TokenController();
  });

  afterAll(async () => {
    testModule.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
