import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Service } from '../../../tokens';
import { Config } from '../../model';
import { PrismaService } from '../../provider';
import { ConfigModule } from '../../provider/config.provider';
import { AccessStrategy } from '../access.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [Service.CONFIG],
      useFactory: (config: Config) => ({
        secretOrPrivateKey: config.JWT_SECRET,
        signOptions: { expiresIn: config.JWT_EXPIRATION },
      }),
    }),
  ],
  providers: [JwtService, AuthService, AccessStrategy, PrismaService],
})
export class AuthModule {}
