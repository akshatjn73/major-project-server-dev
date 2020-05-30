import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { AuthModule } from '../../auth/auth.module';
import { SmtSwitchService } from './smt-switch.service';
import { SmtSwitchController } from './smt-switch.controller';
import { SmartSwitchModule } from '../../repositories/smart-switch/smart-switch.module';
import { LcuModule } from '../../repositories/lcu/lcu.module';

@Module({
    imports: [AuthModule, ConfigModule, SmartSwitchModule, LcuModule],
    controllers: [SmtSwitchController],
    providers: [SmtSwitchService],
    exports: [SmtSwitchService],
})
export class SmtSwitchModule {}
