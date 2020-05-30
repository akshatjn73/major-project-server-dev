import { Test, TestingModule } from '@nestjs/testing';
import { LocalCuService } from './local-cu.service';

describe('LocalCuService', () => {
  let service: LocalCuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalCuService],
    }).compile();

    service = module.get<LocalCuService>(LocalCuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
