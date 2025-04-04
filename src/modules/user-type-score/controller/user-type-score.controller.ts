import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { SubmitUserTypeScoreDto, TestUserTypeScoreDto } from '../model/user-type-score.dto';
import { UserTypeScoreService } from '../service/user-type-score.service';

@Controller('user-type-score')
export class UserTypeScoreController {
    constructor(private readonly userTypeScoreService: UserTypeScoreService) {}

  @Post('test')
  @ApiOperation({ summary: '유형 검사 테스트', description: '유저가 제출한 설문을 기반으로 점수를 계산하고 저장합니다.' })
  async create(@Body() dto: TestUserTypeScoreDto) {
    return this.userTypeScoreService.createScoreFromTest(dto);
  }
  
  @Post('submit')
  @ApiOperation({ summary: '유형 검사 제출', description: '사용자의 검사 결과를 저장하거나 업데이트합니다.' })
  submitOrUpdate(@Body() dto: SubmitUserTypeScoreDto) {
    return this.userTypeScoreService.submitOrUpdateScore(dto);
  }
}