import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from 'src/config/config.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [AuthModule, ConfigModule, UserModule],
    controllers: [LoginController],
    providers: [LoginService],
    exports: [LoginService],
})
export class LoginModule { }
