import { Test, TestingModule } from '@nestjs/testing';
import { GroupCuService } from './group-cu.service';

describe('GroupCuService', () => {
  let service: GroupCuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupCuService],
    }).compile();

    service = module.get<GroupCuService>(GroupCuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
