import { Body, Controller, Post} from '@nestjs/common';
import { UserPatternService } from '../service/user-pattern.service';
import { CreateUserPatternDto } from '../model/user-pattern.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('User Pattern')
@Controller('user-pattern')
export class UserPatternController {
  constructor(private readonly userPatternService: UserPatternService) {}

  @Post()
  @ApiOperation({ summary: '사용자 패턴 정보 생성', description: '개인의 생활 패턴 정보를 등록합니다.' })
  create(@Body() createUserPatternDto: CreateUserPatternDto) {
    return this.userPatternService.createUserPattern(createUserPatternDto);
  }


}
