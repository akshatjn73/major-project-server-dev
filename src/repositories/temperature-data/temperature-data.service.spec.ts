import { Test, TestingModule } from '@nestjs/testing';
import { TemperatureDataService } from './temperature-data.service';

describe('TemperatureDataService', () => {
  let service: TemperatureDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemperatureDataService],
    }).compile();

    service = module.get<TemperatureDataService>(TemperatureDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
