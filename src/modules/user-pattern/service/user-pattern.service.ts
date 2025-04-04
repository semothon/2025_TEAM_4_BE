import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common';
import { CreateUserPatternDto } from '../model/user-pattern.dto';

@Injectable()
export class UserPatternService {
    constructor(private readonly prismaService: PrismaService) {}

    async createUserPattern(dto: CreateUserPatternDto){
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
        return await this.prismaService.userPattern.create({
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

        })
    }
}
