import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common';
import { CreateUserPatternDto, UpdateUserPatternDto } from '../model/user-pattern.dto';

@Injectable()
export class UserPatternService {
    public constructor(private readonly prismaService: PrismaService) {}

    public async createUserPattern(dto: CreateUserPatternDto) {
        const {
            userId,
      sleepTime,
      wakeTime,
      isSmoker,
      isDrinker,
      cleaningCycle,
      noiseSensitivity,
      allowVisitors,
      studyHours,
      preferredTemperature,
      personality,
        } = dto;
        return this.prismaService.userPattern.create({
            data: {
                sleepTime,
                wakeTime,
                isSmoker,
                isDrinker,
                cleaningCycle,
                noiseSensitivity,
                allowVisitors,
                studyHours,
                preferredTemperature,
                personality,
                user: {
                  connect: { id: userId },
                },
              },
        });
    }

    public async updateUserPattern(userId: number, dto: UpdateUserPatternDto) {
      const existing = await this.prismaService.userPattern.findUnique({
        where: {userId : Number(userId)}
      });
      if (!existing) throw new NotFoundException('userID에 맞는 유저 패턴이 없습니다.');

      return this.prismaService.userPattern.update({
        where: {userId : Number(userId)},
        data : dto,
      });
    }
}
