import { Controller, Post, Body, Get, Patch, UseGuards } from '@nestjs/common';
import { MatchRequestService } from '../service/match-request.service';
import { CreateMatchRequestDto, RespondMatchRequestDto } from '../dto/match-request.dto';
import { MatchRequest } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessGuard } from '../../common/security/access.guard';
import { UserData } from '../../user/model/user.data';
import { User } from '../../common/decorators/user.decorator';

@ApiTags('MatchRequest')
@Controller('match-request')
export class MatchRequestController {
  constructor(
    private readonly matchRequestService: MatchRequestService,
  ) {}

  @Post()
  @ApiOperation({ summary: '룸메이트 매칭 요청 생성' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateMatchRequestDto })
  @ApiResponse({status: 201, description: '매칭 요청이 성공적으로 생성됨',type: CreateMatchRequestDto,})
  @UseGuards(AccessGuard)
  public createMatchRequest(@User() user: UserData, @Body() createMatchRequestDto: CreateMatchRequestDto,): Promise<CreateMatchRequestDto> {
    const { receiverId } = createMatchRequestDto;
    return this.matchRequestService.createRequest(user.id, receiverId);
  }

  @Patch('/respond')
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

  @Get('/pending')
  @ApiOperation({ summary: '사용자의 수신 대기 중인 매칭 요청 조회' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: '해당 유저에게 온 대기 중인 요청 리스트 반환', type: [RespondMatchRequestDto]})
  @UseGuards(AccessGuard)
  async getPendingRequests(@User() user: UserData): Promise<MatchRequest[]> {
    return this.matchRequestService.getPendingRequestsForUser(user.id);
  }
}