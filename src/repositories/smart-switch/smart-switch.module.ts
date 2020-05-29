import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmartSwitch } from './smart-switch.entity';
import { SmartSwitchService } from './smart-switch.service';

@Module({
    imports: [TypeOrmModule.forFeature([SmartSwitch])],
    providers: [SmartSwitchService],
    exports: [SmartSwitchService]
})
export class SmartSwitchModule {}
