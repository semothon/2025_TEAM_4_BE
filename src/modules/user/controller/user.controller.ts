import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../../common/decorators/user.decorator';
import { UserData } from '../../common/model/user.data';
import { AccessGuard } from '../../common/security/access.guard';
import { SignUpDto, SignInDto, UpdateUserDto } from '../model/user.dto';
import { UserService } from '../service/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Get('/my')
  @ApiBearerAuth()
  @ApiOperation({ summary: '내 정보 확인', description: '사용자 정보 확인' })
  @UseGuards(AccessGuard)
  public getMyInfo(@User() user: UserData) {
    return user;
  }

  @Post('/sign-up') 
  @ApiOperation({ summary: '회원가입', description: '새로운 사용자를 등록합니다.' })
  public async signUp(@Body() signUpDto: SignUpDto) {
    return this.userService.signUp(signUpDto);
  }

  @Post('/sign-in')
  @ApiOperation({ summary: '로그인', description: '사용자 로그인' })
  public async signIn(@Body() signInDto: SignInDto) {
    return this.userService.signIn(signInDto);
  }

  @Get('/:email')
  @ApiOperation({summary : '내 정보 확인', description: '사용자 정보 확인'})
  public async getUserByEmail(@Param('email') email: string){
    return this.userService.getUserByEmail(email);
  }

  @Put('/:email')
  public async updateUser(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto){
    return this.userService.updateUserByEmail(email, updateUserDto);
  }
}