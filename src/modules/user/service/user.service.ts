import { Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from '../../common';
import { SignUpDto, SignInDto, UpdateUserDto } from '../model/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async signUp(signUpDto: SignUpDto) {
    return await this.prismaService.user.create({
      data: signUpDto,
    });
  }

  async signIn(signInDto: SignInDto) {
    return await this.prismaService.user.findUnique({
      where: { email: signInDto.email },
    });
  }

  async getUserByEmail(email: string){
    const user = await this.prismaService.user.findUnique({where: {email}, });

    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');

    const {password, ...result} = user;
    return result;
  }

  async updateUserByEmail(email: string, updateUserDto: UpdateUserDto){
    const user = await this.prismaService.user.findUnique({where : {email}});

    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');

    const updated = await this.prismaService.user.update({
      where: {email},
      data: updateUserDto,
    });
    const {password, ...result} = updated;
    return result;
  }
}

