import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { AuthModule } from '../../auth/auth.module';
import { LocalCuService } from './local-cu.service';
import { LocalCuController } from './local-cu.controller';
import { LcuModule } from '../../repositories/lcu/lcu.module';
import { TemperatureDataModule } from '../../repositories/temperature-data/temperature-data.module';
import { MemberModule } from '../../repositories/member/member.module';

@Module({
    imports: [AuthModule, ConfigModule, LcuModule, TemperatureDataModule, MemberModule],
    controllers: [LocalCuController],
    providers: [LocalCuService],
    exports: [LocalCuService],
})
export class LocalCuModule {}
