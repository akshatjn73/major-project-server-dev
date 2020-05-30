import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger.middleware';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './ormconfig';
import { UserModule } from './api/user/user.module';
import { LoginModule } from './api/login/login.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TemperatureModule } from './api/temperature/temperature.module';
import { ActivityModule } from './api/activity/activity.module';
import { GroupCuModule } from './api/group-cu/group-cu.module';
import { LocalCuModule } from './api/local-cu/local-cu.module';
import { SmtSwitchModule } from './api/smt-switch/smt-switch.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
    LoginModule,
    AuthModule,
    TemperatureModule,
    ActivityModule,
    GroupCuModule,
    LocalCuModule,
    SmtSwitchModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('/');
  }
}
