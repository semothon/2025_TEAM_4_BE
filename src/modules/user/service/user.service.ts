import { Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { PrismaService } from '../../common';
import { SignUpDto, SignInDto, UpdateUserDto } from '../model/user.dto';
import { AuthService } from '../../common/security/auth/auth.service';

@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService, private readonly authService: AuthService) {}

  public async signUp(signUpDto: SignUpDto) {
    return await this.prismaService.user.create({
      data: signUpDto,
    });
  }

  public async signIn(signInDto: SignInDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: signInDto.email, password: signInDto.password },
      select: {
        id: true,
      }
    });
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.createAccessToken(user.id);
  }

  public async getUserByEmail(email: string){
    const user = await this.prismaService.user.findUnique({where: {email}, });

    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');

    const {password, ...result} = user;
    return result;
  }

  public async updateUserByEmail(email: string, updateUserDto: UpdateUserDto){
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

