import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsInt } from 'class-validator';

export class CreateUserPatternDto {
  @IsInt()
  public userId: number;

  @ApiProperty({
    example: {
      cleanliness: 5,
      noise: 2,
      sharedItems: 3,
      communication: 4,
      sleepPattern: 1,
      sensitivity: 2,
      patience: 4,
      attention: 5,
    },
    description: '유형 분석을 위한 사용자 패턴 정보 (JSON)',
    type: 'object',
  })
  public userInfo: Prisma.InputJsonValue;
}

export class UpdateUserPatternDto extends PartialType(CreateUserPatternDto) {}
