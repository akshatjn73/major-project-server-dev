import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Temperature } from './temperature-data.entity';
import { TemperatureDataService } from './temperature-data.service';

@Module({
  imports: [TypeOrmModule.forFeature([Temperature])],
  providers: [TemperatureDataService],
  exports: [TemperatureDataService]
})
export class TemperatureDataModule {}
