import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { TypeORMMySqlTestingModule } from '../../test/setup';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';

describe('UsersController', () => {
  let module: TestingModule;
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeORMMySqlTestingModule([User]),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    controller = new UsersController(usersService);
  });

  afterAll(async () => {
    module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
