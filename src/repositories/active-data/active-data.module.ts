import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActiveData } from './active-data.entity';
import { ActiveDataService } from './active-data.service';

@Module({
    imports: [TypeOrmModule.forFeature([ActiveData])],
    providers: [ActiveDataService],
    exports: [ActiveDataService]
})
export class ActiveDataModule {}
