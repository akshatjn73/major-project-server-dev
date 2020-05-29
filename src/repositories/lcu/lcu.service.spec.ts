import { Test, TestingModule } from '@nestjs/testing';
import { LcuService } from './lcu.service';

describe('LcuService', () => {
  let service: LcuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LcuService],
    }).compile();

    service = module.get<LcuService>(LcuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
