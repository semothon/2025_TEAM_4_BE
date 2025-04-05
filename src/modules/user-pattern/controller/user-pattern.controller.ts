import { Body, Controller, Get, Post, Put, UseGuards} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '../../common/decorators/user.decorator';
import { UserData } from '../../user/model/user.data';
import { AccessGuard } from '../../common/security/access.guard';
import { USER_PERSONALITY_TYPE } from '../../user-type-score/constants/user-personality-type';
import { CreateUserPatternDto, UpdateUserPatternDto } from '../model/user-pattern.dto';
import { UserPatternService } from '../service/user-pattern.service';
import { UserPattern } from '@prisma/client';

@ApiTags('User Pattern')
@Controller('user-pattern')
export class UserPatternController {
  public constructor(private readonly userPatternService: UserPatternService) {}

  @Get('personality-types')
  @ApiResponse({ status: 200, example: Object.keys(USER_PERSONALITY_TYPE) })
  @ApiOperation({ summary: '사용자 성격 분류 유형 리스트 조회' })
  public getUserPersonalityTypes(): Array<string> {
    return Object.keys(USER_PERSONALITY_TYPE);
  }

  @Post()
  @ApiOperation({ summary: '사용자 패턴 정보 생성', description: '개인의 생활 패턴 정보를 등록합니다.' })
<<<<<<< HEAD
  public async create(@Body() createUserPatternDto: CreateUserPatternDto) {
=======
  create(@Body() createUserPatternDto: CreateUserPatternDto) : Promise<UserPattern>{
>>>>>>> 118306dd60c52e77922343078ed28fd0842bd949
    return this.userPatternService.createUserPattern(createUserPatternDto);
  }

  @Put()
  @UseGuards(AccessGuard)
  @ApiOperation({ summary: '사용자 패턴 정보 수정', description: '사용자의 패턴 정보를 수정합니다.' })
<<<<<<< HEAD
  public async update(@User() user: UserData, @Body()updateUserPatternDto : UpdateUserPatternDto) {
    const { id: userId  } = user;
=======
  update(@Param('userId') userId: number, @Body()updateUserPatternDto : UpdateUserPatternDto): Promise<UserPattern>{
>>>>>>> 118306dd60c52e77922343078ed28fd0842bd949
    return this.userPatternService.updateUserPattern(userId, updateUserPatternDto);
  }
}
