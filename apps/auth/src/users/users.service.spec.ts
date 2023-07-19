import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule,  } from '@nestjs/typeorm';
import { TypeORMMySqlTestingModule } from '../../test/setup';

describe('UsersService', () => {
  let service: UsersService;
  let testingModule: TestingModule;
  let ormModule = TypeORMMySqlTestingModule([User]);

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      imports: [
        ormModule,
        TypeOrmModule.forFeature([User]),
      ],
      providers: [
        UsersService,
      ],
    }).compile();

    service = testingModule.get<UsersService>(UsersService);
  });

  afterEach(async () => {
    await testingModule.close()
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });
});
