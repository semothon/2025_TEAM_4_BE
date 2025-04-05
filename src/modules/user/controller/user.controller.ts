import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { User } from '../../common/decorators/user.decorator';
import { AccessGuard } from '../../common/security/access.guard';
import { SignInResponse } from '../model/response/signin-response';
import { UserWithScore } from '../model/user-with-score.data';
import { UserData } from '../model/user.data';
import { SignUpDto, SignInDto, UpdateUserDto } from '../model/user.dto';
import { UserService } from '../service/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Get('/my')
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: '로그인 성공', type: UserData })
  @ApiResponse({ status: 401, description: '로그인 실패' })
  @ApiOperation({ summary: '내 정보 확인', description: '사용자 정보 확인' })
  @UseGuards(AccessGuard)
  public getMyInfo(@User() user: UserData): UserData{
    return user;
  }

  @Get('/similar')
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  @ApiOperation({ summary: '유사한 사용자 추천', description: '로그인한 사용자와 유사한 유형의 사용자들을 5명 추천합니다.' })
  @ApiResponse({ status: 200, description: '유사한 사용자 목록 반환', type: [UserWithScore] })
  public async findSimilarUsers(@User() user: UserData): Promise<UserWithScore[]> {
    return this.userService.findSimilarUsers(user.id, 5);
  }

  @Post('/sign-up')
  @ApiResponse({ status: 201, description: '회원가입 성공', type: UserData })
  @ApiOperation({ summary: '회원가입', description: '새로운 사용자를 등록합니다.' })
  public async signUp(@Body() signUpDto: SignUpDto): Promise<UserData>{
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
  @ApiOperation({ summary: '(구) 내 정보 확인', description: '이메일을 이용해 사용자 정보를 가져옵니다. ' })
  @ApiResponse({ status: 200, description: '사용자 정보 반환 성공', type: UserData })
  public async getUserByEmail(@Param('email') email: string): Promise<UserData> {
    return this.userService.getUserByEmail(email);
  }

  @Put('/:email')
  @ApiOperation({ summary: '사용자 정보 수정', description: '이메일로 사용자를 찾아 정보를 수정합니다.' })
  @ApiResponse({ status: 200, description: '사용자 정보 수정 성공', type: UserData })
  public async updateUser(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto): Promise<Omit<UserData, 'password'>> {
    return this.userService.updateUserByEmail(email, updateUserDto);
  }
}
