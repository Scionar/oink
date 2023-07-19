import { Test, TestingModule } from '@nestjs/testing';
import { TokenController } from './token.controller';

describe('TokenController', () => {
  let controller: TokenController;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      controllers: [TokenController],
    }).compile();

    controller = testModule.get<TokenController>(TokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
