import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common';
import { CreateUserPatternDto, UpdateUserPatternDto } from '../model/user-pattern.dto';
import { UserPattern, Prisma } from '@prisma/client';

@Injectable()
export class UserPatternService {
  public constructor(private readonly prismaService: PrismaService) {}

  async createUserPattern(dto: CreateUserPatternDto): Promise<UserPattern> {
    const existing = await this.prismaService.userPattern.findUnique({
      where: { userId: dto.userId },
    });
  
    if (existing) {
      return this.prismaService.userPattern.update({
        where: { userId: dto.userId },
        data: {
          userInfo: dto.userInfo,
        },
      });
    }
  
    // 존재하지 않으면 create
    return this.prismaService.userPattern.create({
      data: {
        userId: dto.userId,
        userInfo: dto.userInfo,
      },
    });
  }

  public async updateUserPattern(userId: number, dto: UpdateUserPatternDto): Promise<UserPattern> {
    const existing = await this.prismaService.userPattern.findUnique({ where: { userId } });

    if (!existing) {
      throw new NotFoundException('해당 유저의 패턴 정보가 존재하지 않습니다.');
    }

    return this.prismaService.userPattern.update({
      where: { userId },
      data: {
        userInfo: dto.userInfo as Prisma.InputJsonValue,
      },
    });
  }
}
