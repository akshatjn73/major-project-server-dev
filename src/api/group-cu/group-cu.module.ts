import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { AuthModule } from '../../auth/auth.module';
import { GroupCuController } from './group-cu.controller';
import { GroupCuService } from './group-cu.service';
import { GcuModule } from '../../repositories/gcu/gcu.module';

@Module({
    imports: [AuthModule, ConfigModule, GcuModule],
    controllers: [GroupCuController],
    providers: [GroupCuService],
    exports: [GroupCuService],
})
export class GroupCuModule {}
