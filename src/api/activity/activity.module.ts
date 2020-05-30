import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { ConfigModule } from '../../config/config.module';
import { AuthModule } from '../../auth/auth.module';
import { ActiveDataModule } from '../../repositories/active-data/active-data.module';
import { SmtSwitchModule } from '../smt-switch/smt-switch.module';

@Module({
    imports: [AuthModule, ConfigModule, ActiveDataModule, SmtSwitchModule],
    controllers: [ActivityController],
    providers: [ActivityService],
    exports: [ActivityService],
})
export class ActivityModule {}
