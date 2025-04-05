import { Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { PrismaService } from '../../common';
import { UserData } from '../../common/model/user.data';
import { AuthService } from '../../common/security/auth/auth.service';
import { SignUpDto, SignInDto, UpdateUserDto } from '../model/user.dto';

@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService, private readonly authService: AuthService) {}

  public async signUp(signUpDto: SignUpDto): Promise<UserData> {
    const newUser = await this.prismaService.user.create({
      data: signUpDto,
    });
    return new UserData(newUser);
  }

  public async signIn(signInDto: SignInDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: signInDto.email, password: signInDto.password },
      select: {
        id: true,
      }
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.createAccessToken(user.id);
  }

  public async getUserByEmail(email: string): Promise<UserData> {
    const user = await this.prismaService.user.findUnique({where: {email}, });

    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');

    return new UserData(user);
  }

  public async updateUserByEmail(email: string, updateUserDto: UpdateUserDto){
    const user = await this.prismaService.user.findUnique({where : {email}});

    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');

    const updated = await this.prismaService.user.update({
      where: {email},
      data: updateUserDto,
    });

    return new UserData(updated);
  }
}

