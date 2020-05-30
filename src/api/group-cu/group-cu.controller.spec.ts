import { Test, TestingModule } from '@nestjs/testing';
import { GroupCuController } from './group-cu.controller';

describe('GroupCu Controller', () => {
  let controller: GroupCuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupCuController],
    }).compile();

    controller = module.get<GroupCuController>(GroupCuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
