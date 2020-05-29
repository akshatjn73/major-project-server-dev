import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../api/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../api/user/user.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../config/config.module';
import { TokensService } from './tokens/tokens.service';
import { TokenModule } from 'src/repositories/token/token.module';
import { ConfigService } from 'src/config/config.service'

@Module({
  imports: [
    UserModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('ACCESS_TOKEN_SECRET_KEY'),
        signOptions: { expiresIn: configService.get('ACCESS_TOKEN_TIMEOUT') },
      }),
      inject: [ConfigService],
    }),
    TokenModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, TokensService],
  exports: [AuthService, TokensService],
})
export class AuthModule { }
