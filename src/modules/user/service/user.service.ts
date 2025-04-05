import { Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {UserTypeScore, Prisma} from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../common';
import { AuthService } from '../../common/security/auth/auth.service';
import { UserTypeScoreData } from '../../user-pattern/model/user-type-score.data';
import { USER_PERSONALITY_TYPE } from '../../user-type-score/constants/user-personality-type';
import {UserWithScoreData} from '../model/user-with-score.data';
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
    const similarUsers: (UserData & Partial<UserTypeScoreData>)[] = await this.prismaService.$queryRaw`
      SELECT
        u.id, 
        u.name,
        u.email,
        u.birthdate,
        u.gender,
        u.country,
        u.university,
        u.department,
        u."studentId",
        pv."cleanliness",
        pv."noise",
        pv."sharedItems",
        pv."communication",
        pv."sleepPattern",
        pv."patience",
        pv."attention",
    cube(array[
      ${Prisma.join(
        types.map(type => Prisma.sql`CAST(pv."${Prisma.raw(type)}" AS float)`)
      )}
    ]) <-> cube(CAST(ARRAY[${
      types.map((type) => targetUser.userTypeScore?.[type as keyof typeof targetUser.userTypeScore] ?? 0)
     }] AS float[])) as distance
      FROM "users" u
      JOIN "user_type_scores" pv ON u."id" = pv."userId"
      WHERE u.id != ${userId}
      ORDER BY distance ASC
      LIMIT ${limit}
    `;
    const newUsers: UserWithScoreData[] = similarUsers.map((user) => {
      const userTypeScore = new UserTypeScoreData({
        cleanliness: user.cleanliness ?? 0,
        noise: user.noise ?? 0,
        sharedItems: user.sharedItems ?? 0,
        communication: user.communication ?? 0,
        sleepPattern: user.sleepPattern ?? 0,
        patience: user.patience ?? 0,
        attention: user.attention ?? 0,
      } as UserTypeScore);
      delete user.attention;
      delete user.patience;
      delete user.sleepPattern;
      delete user.communication;
      delete user.sharedItems;
      delete user.noise;
      delete user.cleanliness;
      return {
        ...user,
        userTypeScore,
      } as UserWithScoreData;
    });
    return newUsers;
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

