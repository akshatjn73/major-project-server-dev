import { Module } from '@nestjs/common';
import { TemperatureService } from './temperature.service';
import { TemperatureController } from './temperature.controller';
import { ConfigModule } from '../../config/config.module';
import { TemperatureDataModule } from '../../repositories/temperature-data/temperature-data.module';
import { AuthModule } from '../../auth/auth.module';

@Module({
    imports: [AuthModule, ConfigModule, TemperatureDataModule],
    controllers: [TemperatureController],
    providers: [TemperatureService],
    exports: [TemperatureService],
})
export class TemperatureModule {}
