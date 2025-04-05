import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../common';
import { ConfigModule } from '../common/provider/config.provider';
import { AuthService } from '../common/security/auth/auth.service';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';

@Module({
  imports: [ConfigModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, AuthService, JwtService],
  exports: [UserService],
})
export class UserModule {}
