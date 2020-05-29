import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GCU } from './gcu.entity';
import { GcuService } from './gcu.service';

@Module({
    imports: [TypeOrmModule.forFeature([GCU])],
    providers: [GcuService],
    exports: [GcuService]
})
export class GcuModule {}
