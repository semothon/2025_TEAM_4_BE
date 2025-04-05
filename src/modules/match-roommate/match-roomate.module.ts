import { Module } from '@nestjs/common';
import { MatchRoommateController } from './controller/match-roommate.controller';
import { MatchRoomateService } from './service/match-roomate.service';
import { PrismaService } from '../common';

@Module({
    controllers: [MatchRoommateController],
    providers: [MatchRoomateService, PrismaService]
})
export class MatchRoomateModule {}
