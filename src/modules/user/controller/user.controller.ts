import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SignUpDto, SignInDto, UpdateUserDto } from '../model/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  @ApiOperation({ summary: '회원가입', description: '새로운 사용자를 등록합니다.' })
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.userService.signUp(signUpDto);
  }

  @Post('/sign-in')
  @ApiOperation({ summary: '로그인', description: '사용자 로그인' })
  async signIn(@Body() signInDto: SignInDto) {
    //console.log("로그인 성공!");
    return this.userService.signIn(signInDto);
  }

  @Get('/:email')
  @ApiOperation({summary : '내 정보 확인', description: '사용자 정보 확인'})
  async getUserByEmail(@Param('email') email: string){
    return this.userService.getUserByEmail(email);
  }

  @Put('/:email')
  async updateUser(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto){
    return this.userService.updateUserByEmail(email, updateUserDto);
  }

}