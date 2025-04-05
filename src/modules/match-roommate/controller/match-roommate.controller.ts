import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MatchRoomateService } from '../service/match-roomate.service';
import { MatchRoommateDto } from '../dto/match-roommate.dto';

@ApiTags('Roommate Matching')
@Controller('/match-roommate')
export class MatchRoommateController {
    constructor(private readonly matchRoomateService :MatchRoomateService){}    

    @Post()
    @ApiOperation({ summary: '룸메이트 자동 매칭', description: '유형 점수 기반으로 가장 유사한 사용자와 룸메이트를 매칭합니다.(유클리디언 거리 유사도)' })
    matchRoommate(@Body() dto: MatchRoommateDto) {
        return this.matchRoomateService.matchRoommate(dto.userId);
    }
}
