import { Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {User} from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../common';
import { AuthService } from '../../common/security/auth/auth.service';
import { USER_PERSONALITY_TYPE } from '../../user-type-score/constants/user-personality-type';
import {IUserTypeScore, UserWithScoreData} from '../model/user-with-score.data';
import { UserData } from '../model/user.data';
import { SignUpDto, SignInDto, UpdateUserDto } from '../model/user.dto';

@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService, private readonly authService: AuthService) {}

  public async findSimilarUsers(userId: number, types: (keyof typeof USER_PERSONALITY_TYPE)[], limit: number): Promise<UserWithScoreData[]> {
    const targetUser = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: { userTypeScore: true }
    });
    if (!targetUser || !targetUser?.userTypeScore) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }
    const similarUsers: Array<User & IUserTypeScore> = await this.prismaService.$queryRaw`
      SELECT 
        u.id, 
        u.name,
        cube(array[
          ${types.map(
            type => `pv.${type}`
          ).join(', ')}
        ]) <-> cube(array[
          ${
            types.map(
              type => targetUser.userTypeScore?.[type as keyof typeof targetUser.userTypeScore] ?? 0
            ).join(', ')
          }
        ]) as distance
      FROM "User" u
      JOIN "PersonalityVector" pv ON u."personalityVectorId" = pv.id
      WHERE u.id != ${userId}
      ORDER BY distance ASC
      LIMIT ${limit}
    `;
    return similarUsers.map(user => new UserWithScoreData(user));
  }

  public async signUp(signUpDto: SignUpDto): Promise<UserData> {
    const { password, ...rest } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10); // saltRounds = 10

    const newUser = await this.prismaService.user.create({
      data: {
        ...rest,
        password: hashedPassword,
      },
    });

    return new UserData(newUser);
  }


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

