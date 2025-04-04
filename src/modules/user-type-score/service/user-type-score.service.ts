import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common';
import { SubmitUserTypeScoreDto, TestUserTypeScoreDto } from '../model/user-type-score.dto';

@Injectable()
export class UserTypeScoreService {
    constructor(private readonly prisma: PrismaService) {}
    async createScoreFromTest(dto: TestUserTypeScoreDto) {
        const {
          userId,
          cleanliness,
          noise,
          sharedItems,
          communication,
          sleepPattern,
          sensitivity,
          patience,
          attention,
        } = dto;
    
        return await this.prisma.userTypeScore.create({
          data: {
            userId,
            cleanliness,
            noise,
            sharedItems,
            communication,
            sleepPattern,
            sensitivity,
            patience,
            attention,
          },
        });
      }

      async submitOrUpdateScore(dto: SubmitUserTypeScoreDto) {
        return this.prisma.userTypeScore.upsert({
          where: { userId: dto.userId },
          update: {
            cleanliness: dto.cleanliness,
            noise: dto.noise,
            sharedItems: dto.sharedItems,
            communication: dto.communication,
            sleepPattern: dto.sleepPattern,
            sensitivity: dto.sensitivity,
            patience: dto.patience,
            attention: dto.attention,
          },
          create: {
            userId: dto.userId,
            cleanliness: dto.cleanliness,
            noise: dto.noise,
            sharedItems: dto.sharedItems,
            communication: dto.communication,
            sleepPattern: dto.sleepPattern,
            sensitivity: dto.sensitivity,
            patience: dto.patience,
            attention: dto.attention,
          },
        });
      }
}
