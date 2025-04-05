import { Body, Controller, Get, Post, Put, UseGuards} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { UserPattern } from '@prisma/client';
import { User } from '../../common/decorators/user.decorator';
import { AccessGuard } from '../../common/security/access.guard';
import { UserData } from '../../user/model/user.data';
import { USER_PERSONALITY_TYPE } from '../../user-type-score/constants/user-personality-type';
import { CreateUserPatternDto, UpdateUserPatternDto } from '../model/user-pattern.dto';
import { UserPatternService } from '../service/user-pattern.service';

@ApiTags('UserPattern')
@Controller('user-pattern')
export class UserPatternController {
  public constructor(private readonly userPatternService: UserPatternService) {}

  @Get('personality-types')
  @ApiResponse({ status: 200, description: '사용자 성격 분류 유형 리스트 반환' })
  @ApiOperation({ summary: '사용자 성격 분류 유형 리스트 조회' })
  public getUserPersonalityTypes(): string[] {
    return Object.keys(USER_PERSONALITY_TYPE);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  @ApiOperation({ summary: '사용자 패턴 정보 생성', description: '인증된 사용자의 생활 패턴 정보를 등록합니다.' })
  @ApiResponse({ status: 201, description: '사용자 패턴 등록 성공', type: CreateUserPatternDto })
  @ApiBody({
    description: 'userId는 인증된 사용자로부터 자동 추출되며, body에는 userInfo만 포함됩니다.',
schema: {
      type: 'object',
      properties: {
        userInfo: {
          type: 'object',
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
        },
      },
    },
  })
  public async create(
    @User() user: UserData, // 인증된 유저 정보
    @Body() createUserPatternDto: Omit<CreateUserPatternDto, 'userId'>, // userId 제외
  ): Promise<UserPattern> {
    return this.userPatternService.createUserPattern({
      ...createUserPatternDto,
      userId: user.id, // userId를 인증된 유저에서 추출
    });
  }

@Put()
@ApiOperation({ summary: '사용자 패턴 정보 수정', description: '사용자의 패턴 정보를 수정합니다.' })
@ApiResponse({ status: 200, description: '패턴 정보 수정 완료', type: UpdateUserPatternDto })
@ApiBody({
  description: 'userId는 인증된 사용자로부터 자동 추출되며, body에는 userInfo만 포함됩니다.',
  schema: {
    type: 'object',
    properties: {
      userInfo: {
        type: 'object',
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
      },
    },
  },
})
@UseGuards(AccessGuard)
public async update(
  @User() user: UserData, // 인증된 유저 정보
  @Body() updateUserPatternDto: Omit<UpdateUserPatternDto, 'userId'>, // userId 제외
): Promise<UserPattern> {
  return this.userPatternService.updateUserPattern({
    ...updateUserPatternDto,
    userId: user.id, // userId를 자동으로 추가
  });
}
}
