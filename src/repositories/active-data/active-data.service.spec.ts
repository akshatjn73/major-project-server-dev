import { Test, TestingModule } from '@nestjs/testing';
import { ActiveDataService } from './active-data.service';

describe('ActiveDataService', () => {
  let service: ActiveDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActiveDataService],
    }).compile();

    service = module.get<ActiveDataService>(ActiveDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
