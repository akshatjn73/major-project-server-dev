import { Test, TestingModule } from '@nestjs/testing';
import { SmtSwitchService } from './smt-switch.service';

describe('SmtSwitchService', () => {
  let service: SmtSwitchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmtSwitchService],
    }).compile();

    service = module.get<SmtSwitchService>(SmtSwitchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
