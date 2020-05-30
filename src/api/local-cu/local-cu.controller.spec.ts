import { Test, TestingModule } from '@nestjs/testing';
import { LocalCuController } from './local-cu.controller';

describe('LocalCu Controller', () => {
  let controller: LocalCuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalCuController],
    }).compile();

    controller = module.get<LocalCuController>(LocalCuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
