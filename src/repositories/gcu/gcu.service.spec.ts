import { Test, TestingModule } from '@nestjs/testing';
import { GcuService } from './gcu.service';

describe('GcuService', () => {
  let service: GcuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GcuService],
    }).compile();

    service = module.get<GcuService>(GcuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
