import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { MatchRequestService } from '../service/match-request.service';
import { CreateMatchRequestDto, RespondMatchRequestDto } from '../dto/match-request.dto';
import { MatchRequest } from '@prisma/client';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('MatchRequest') // Swagger 태그
@Controller('match-request')
export class MatchRequestController {
  constructor(
    private readonly matchRequestService: MatchRequestService,
  ) {}

  @Post()
  @ApiOperation({ summary: '룸메이트 매칭 요청 생성' })
  @ApiBody({ type: CreateMatchRequestDto })
  @ApiResponse({status: 201, description: '매칭 요청이 성공적으로 생성됨',
    type: CreateMatchRequestDto,
  })
  createMatchRequest(@Body() dto: CreateMatchRequestDto): Promise<CreateMatchRequestDto> {
    return this.matchRequestService.createRequest(dto);
  }

  @Patch('respond')
  @ApiOperation({ summary: '룸메이트 매칭 요청에 응답' })
  @ApiBody({ type: RespondMatchRequestDto })
  @ApiResponse({
    status: 200,
    description: '매칭 요청에 대한 응답 처리',
    type: RespondMatchRequestDto,
  })
  respondToMatchRequest(@Body() dto: RespondMatchRequestDto,): Promise<MatchRequest> {
    return this.matchRequestService.respondRequest(dto);
  }

  @Get('pending/:userId')
  @ApiOperation({ summary: '사용자의 수신 대기 중인 매칭 요청 조회' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({
    status: 200,
    description: '해당 유저에게 온 대기 중인 요청 리스트 반환',
    type: [CreateMatchRequestDto],
  })
  
  getPendingRequests(@Param('userId') userId: number,): Promise<MatchRequest[]> {
    return this.matchRequestService.getPendingRequestsForUser(+userId);
  }
}