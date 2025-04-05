import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common';
import { SubmitUserTypeScoreDto, TestUserTypeScoreDto } from '../model/user-type-score.dto';

@Injectable()
export class UserTypeScoreService {
    constructor(private readonly prisma: PrismaService) {}
    async createScoreFromTest(dto: TestUserTypeScoreDto) {
      const { userId, ...scoreData } = dto;
    
      return await this.prisma.userTypeScore.upsert({
        where: { userId },
        update: { ...scoreData },
        create: { userId, ...scoreData },
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
            patience: dto.patience,
            attention: dto.attention,
          },
        });
      }
}
