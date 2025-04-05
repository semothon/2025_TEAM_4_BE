import { Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { PrismaService } from '../../common';
import { UserData } from '../../common/model/user.data';
import { AuthService } from '../../common/security/auth/auth.service';
<<<<<<< HEAD
import * as bcrypt from 'bcrypt';
import { UserData } from '../../common/model/user.data';
=======
import { SignUpDto, SignInDto, UpdateUserDto } from '../model/user.dto';
>>>>>>> e1d30d2a1c104bc034a919ca77ae66b324c99484

@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService, private readonly authService: AuthService) {}

  public async signUp(signUpDto: SignUpDto): Promise<UserData> {
<<<<<<< HEAD
    const { password, ...rest } = signUpDto;
  
    const hashedPassword = await bcrypt.hash(password, 10); // saltRounds = 10
  
    return await this.prismaService.user.create({
      data: {
        ...rest,
        password: hashedPassword,
      },
=======
    const newUser = await this.prismaService.user.create({
      data: signUpDto,
>>>>>>> e1d30d2a1c104bc034a919ca77ae66b324c99484
    });
    return new UserData(newUser);
  }

<<<<<<< HEAD
public async signIn(signInDto: SignInDto): Promise<string> {
  const { email, password } = signInDto;

  const user = await this.prismaService.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');
  }
  return this.authService.createAccessToken(user.id);
}


  public async getUserByEmail(email: string): Promise<Omit<UserData, 'password'>>{
=======
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
>>>>>>> e1d30d2a1c104bc034a919ca77ae66b324c99484
    const user = await this.prismaService.user.findUnique({where: {email}, });

    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');

    return new UserData(user);
  }

  public async updateUserByEmail(email: string, updateUserDto: UpdateUserDto) :Promise<Omit<UserData, 'password'>>{
    const user = await this.prismaService.user.findUnique({where : {email}});

    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');

    const updated = await this.prismaService.user.update({
      where: {email},
      data: updateUserDto,
    });

    return new UserData(updated);
  }
}

