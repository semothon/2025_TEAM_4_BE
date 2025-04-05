import { Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../common';
import { UserData } from '../model/user.data';
import { AuthService } from '../../common/security/auth/auth.service';
import { USER_PERSONALITY_TYPE } from '../../user-type-score/constants/user-personality-type';
import { SignUpDto, SignInDto, UpdateUserDto } from '../model/user.dto';
import { UserWithScore } from '../model/user-with-score.data';

@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService, private readonly authService: AuthService) {}

  public async findSimilarUsers(userId: number, limit: number): Promise<UserWithScore[]> {
    const targetUser = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: { userTypeScore: true }
    });
    if (!targetUser || !targetUser?.userTypeScore) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }
    // Raw SQL 쿼리로 유클리드 거리 계산
    const similarUsers: Array<User> = await this.prismaService.$queryRaw`
      SELECT 
        u.id, 
        u.name,
        cube(array[
          pv.type1, pv.type2, pv.type3, pv.type4,
          pv.type5, pv.type6, pv.type7, pv.type8
        ]) <-> cube(array[
          ${
            Object.keys(USER_PERSONALITY_TYPE).map(
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
    return similarUsers.map(user => new UserWithScore(user));
  }

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

