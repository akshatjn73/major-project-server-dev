import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LCU } from './lcu.entity'
import { LcuService } from './lcu.service'

@Module({
    imports: [TypeOrmModule.forFeature([LCU])],
    providers: [LcuService],
    exports: [LcuService]
})
export class LcuModule {}
