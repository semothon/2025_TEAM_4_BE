import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class MatchRoommateDto {
  @ApiProperty({ example: 1, description: '룸메이트 매칭을 실행할 사용자 ID' })
  @IsInt()
  userId: number;
}
