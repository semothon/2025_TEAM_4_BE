import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { User } from '../../common/decorators/user.decorator';
import { UserData } from '../../common/model/user.data';
import { AccessGuard } from '../../common/security/access.guard';
import { SignInResponse } from '../model/response/signin-response';
import { SignUpDto, SignInDto, UpdateUserDto } from '../model/user.dto';
import { UserService } from '../service/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Get('/my')
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: '로그인 성공', type: String })
  @ApiResponse({ status: 401, description: '로그인 실패' })
  @ApiOperation({ summary: '내 정보 확인', description: '사용자 정보 확인' })
  @UseGuards(AccessGuard)
  public getMyInfo(@User() user: UserData): UserData {
    return user;
  }

  @Post('/sign-up')
  @ApiResponse({ status: 201, description: '회원가입 성공', type: UserData })
  @ApiOperation({ summary: '회원가입', description: '새로운 사용자를 등록합니다.' })
  public async signUp(@Body() signUpDto: SignUpDto): Promise<UserData> {
    return this.userService.signUp(signUpDto);
  }

  @Post('/sign-in')
  @ApiOperation({ summary: '로그인', description: '사용자 로그인' })
  @ApiResponse({
    status: 201,
    description: '로그인 성공',
    type: SignInResponse,
  })
  @ApiResponse({ status: 401, description: '로그인 실패' })
  public async signIn(@Body() signInDto: SignInDto): Promise<SignInResponse> {
    return {
      accessToken: await this.userService.signIn(signInDto),
    };
  }

  @Get('/:email')
  @ApiOperation({summary : '(구) 내 정보 확인', description: '사용자 정보 확인 (미로그인 상태)'})
  public async getUserByEmail(@Param('email') email: string): Promise<UserData> {
    return this.userService.getUserByEmail(email);
  }

  @Put('/:email')
  public async updateUser(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto): Promise<UserData> {
    return this.userService.updateUserByEmail(email, updateUserDto);
  }
}
