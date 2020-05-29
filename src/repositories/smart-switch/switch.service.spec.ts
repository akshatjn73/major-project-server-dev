import { Test, TestingModule } from '@nestjs/testing';
import { SmartSwitchService } from './smart-switch.service';

describe('SwitchService', () => {
  let service: SmartSwitchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmartSwitchService],
    }).compile();

    service = module.get<SmartSwitchService>(SmartSwitchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
