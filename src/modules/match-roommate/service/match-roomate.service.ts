import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common';
import { User, UserTypeScore } from '@prisma/client';

@Injectable()
export class MatchRoomateService {
    constructor (private readonly prisma: PrismaService){}
    
    async matchRoommate(userId: number) {
        const me = await this.prisma.user.findUnique({
          where: { id: userId },
          include: { userTypeScore: true },
        });
      
        if (!me || !me.userTypeScore) {
          throw new NotFoundException('사용자 또는 사용자 점수 정보가 존재하지 않습니다.');
        }
      
        // 매칭이 이미 되어 있다면 예외
        if (me.roommateId !== null) {
          throw new ConflictException('이미 룸메이트가 존재합니다.');
        }
      
        const others = await this.prisma.user.findMany({
          where: {
            id: { not: userId },
            roommateId: null, 
            userTypeScore: { isNot: null },
          },
          include: { userTypeScore: true },
        });
      
        let bestMatch: User | null = null;
        let bestScore = Infinity;
      
        for (const other of others) {   
          if (!other.userTypeScore) continue;
      
          const score = this.roommateMatchingAlgorithm(me.userTypeScore, other.userTypeScore);
          if (score < bestScore) {
            bestScore = score;
            bestMatch = other;
          }
        }
      
        if (!bestMatch) {
          throw new NotFoundException('매칭 가능한 룸메이트가 없습니다.');
        }
      
        await this.prisma.user.update({
          where: { id: userId },
          data: { roommateId: bestMatch.id },
        });
      
        await this.prisma.user.update({
          where: { id: bestMatch.id },
          data: { roommateId: userId },
        });
      
        return {
          message: '룸메이트가 매칭되었습니다.',
          roommate: bestMatch,
        };
      }

      // 수정 가능 (일단은 유클리디언 거리로...)
      private roommateMatchingAlgorithm(
        scoreA: UserTypeScore,
        scoreB: UserTypeScore,
      ): number {
        return Math.sqrt(
          Math.pow(scoreA.cleanliness - scoreB.cleanliness, 2) +
          Math.pow(scoreA.noise - scoreB.noise, 2) +
          Math.pow(scoreA.sharedItems - scoreB.sharedItems, 2) +
          Math.pow(scoreA.communication - scoreB.communication, 2) +
          Math.pow(scoreA.sleepPattern - scoreB.sleepPattern, 2) +
          Math.pow(scoreA.patience - scoreB.patience, 2) +
          Math.pow(scoreA.attention - scoreB.attention, 2)
        );
      }
    }
