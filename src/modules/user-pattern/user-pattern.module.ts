import { Module } from '@nestjs/common';
import { UserPatternService } from './service/user-pattern.service';
import { UserPatternController } from './controller/user-pattern.controller';
import { PrismaService } from '../common';

@Module({
  controllers: [UserPatternController],
  providers: [UserPatternService, PrismaService],
})
export class UserPatternModule {}
