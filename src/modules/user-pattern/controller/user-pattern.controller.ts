import { Body, Controller, Post, Put, UseGuards} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { User } from '../../common/decorators/user.decorator';
import { UserData } from '../../common/model/user.data';
import { AccessGuard } from '../../common/security/access.guard';
import { CreateUserPatternDto, UpdateUserPatternDto } from '../model/user-pattern.dto';
import { UserPatternService } from '../service/user-pattern.service';

@ApiTags('User Pattern')
@Controller('user-pattern')
export class UserPatternController {
  public constructor(private readonly userPatternService: UserPatternService) {}

  @Post()
  @ApiOperation({ summary: '사용자 패턴 정보 생성', description: '개인의 생활 패턴 정보를 등록합니다.' })
  public async create(@Body() createUserPatternDto: CreateUserPatternDto) {
    return this.userPatternService.createUserPattern(createUserPatternDto);
  }

  @Put()
  @UseGuards(AccessGuard)
  @ApiOperation({ summary: '사용자 패턴 정보 수정', description: '사용자의 패턴 정보를 수정합니다.' })
  public async update(@User() user: UserData, @Body()updateUserPatternDto : UpdateUserPatternDto) {
    const { id: userId  } = user;
    return this.userPatternService.updateUserPattern(userId, updateUserPatternDto);
  }
}
