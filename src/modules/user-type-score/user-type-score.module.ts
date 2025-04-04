import { Module } from '@nestjs/common';
import { UserTypeScoreService } from './service/user-type-score.service';
import { UserTypeScoreController } from './controller/user-type-score.controller';
import { PrismaService } from '../common';

@Module({
    controllers: [UserTypeScoreController],
    providers: [UserTypeScoreService, PrismaService]
})
export class UserTypeScoreModule {}
