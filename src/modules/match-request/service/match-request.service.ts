import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common';
import { RespondMatchRequestDto } from '../dto/match-request.dto';
import { MatchRequest } from '@prisma/client';

@Injectable()
export class MatchRequestService {
  constructor(private readonly prisma: PrismaService) {}

  async createRequest(senderId: number, receiverId: number): Promise<MatchRequest> {
    if (senderId === receiverId) {
      throw new BadRequestException("자기 자신에게 매칭 요청을 보낼 수 없습니다.");
    }
  
    const existing = await this.prisma.matchRequest.findFirst({
      where: {
        senderId,
        receiverId,
        status: 'PENDING',
      },
    });
  
    if (existing) {
      throw new BadRequestException("이미 요청을 보낸 상태입니다.");
    }
  
    return this.prisma.matchRequest.create({
      data: {
        senderId,
        receiverId,
        status: 'PENDING',
      },
    });
  }
  

  async respondRequest(dto: RespondMatchRequestDto){
    const { requestId, accepted } = dto;

    const request = await this.prisma.matchRequest.findUnique({
      where: { id: requestId }
    });

    if (!request) {
      throw new NotFoundException("요청을 찾을 수 없습니다.");
    }

    const updated = await this.prisma.matchRequest.update({
      where: { id: requestId },
      data: {
        status: accepted ? 'ACCEPTED' : 'REJECTED'
      }
    });

    if (accepted) {
      // 양방향 roommate 연결
      await this.prisma.user.update({
        where: { id: request.senderId },
        data: { roommateId: request.receiverId }
      });

      await this.prisma.user.update({
        where: { id: request.receiverId },
        data: { roommateId: request.senderId }
      });
    }

    return updated;
  }

  async getPendingRequestsForUser(userId: number) {
    return this.prisma.matchRequest.findMany({
      where: {
        receiverId: userId,
        status: 'PENDING'
      },
      include: {
        sender: true
      }
    });
  }
}
