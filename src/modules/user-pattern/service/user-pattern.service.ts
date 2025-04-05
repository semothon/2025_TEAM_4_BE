import { BadRequestException, Injectable} from '@nestjs/common';
import { PrismaService } from '../../common';
import {  CreateUserPatternDto, UpdateUserPatternDto,  } from '../model/user-pattern.dto';
import { UserPattern } from '@prisma/client';

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
  
    return this.prismaService.userPattern.create({
      data: {
        userId: dto.userId,
        userInfo: dto.userInfo,
      },
    });
  }

  async updateUserPattern(dto: UpdateUserPatternDto): Promise<UserPattern> {
    if (dto.userId === undefined) {
      throw new BadRequestException('userId는 필수 항목입니다.');
    }
  
    if (!dto.userInfo || Object.keys(dto.userInfo).length === 0) {
      throw new BadRequestException('userInfo는 필수 항목입니다.');
    }
  
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
  
    return this.prismaService.userPattern.create({
      data: {
        userId: dto.userId,
        userInfo: dto.userInfo,
      },
    });
  }
}