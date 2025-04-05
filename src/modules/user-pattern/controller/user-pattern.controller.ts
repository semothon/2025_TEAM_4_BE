import { Body, Controller, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserPattern } from '@prisma/client';
import { AccessGuard } from '../../common/security/access.guard';
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
  @ApiOperation({ summary: '사용자 패턴 정보 생성', description: '개인의 생활 패턴 정보를 등록합니다.' })
  @ApiResponse({ status: 201, description: '사용자 패턴 등록 성공', type: CreateUserPatternDto })
  public async create(@Body() createUserPatternDto: CreateUserPatternDto): Promise<UserPattern> {
    return this.userPatternService.createUserPattern(createUserPatternDto);
  }

  @Put(':userId')
  @UseGuards(AccessGuard)
  @ApiOperation({ summary: '사용자 패턴 정보 수정', description: '사용자의 패턴 정보를 수정합니다.' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, description: '패턴 정보 수정 완료', type: UpdateUserPatternDto })
  public async update(
    @Param('userId') userId: number,
    @Body() updateUserPatternDto: UpdateUserPatternDto,
  ): Promise<UserPattern> {
    return this.userPatternService.updateUserPattern(userId, updateUserPatternDto);
  }
}
