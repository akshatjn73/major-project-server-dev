import { Test, TestingModule } from '@nestjs/testing';
import { SmtSwitchController } from './smt-switch.controller';

describe('SmtSwitch Controller', () => {
  let controller: SmtSwitchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmtSwitchController],
    }).compile();

    controller = module.get<SmtSwitchController>(SmtSwitchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
