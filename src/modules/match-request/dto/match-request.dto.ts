import { ApiProperty } from "@nestjs/swagger";

export class CreateMatchRequestDto {
  @ApiProperty({ example: 1, description: '매칭 요청을 받을 사용자 ID' })
  receiverId: number;
}

export class RespondMatchRequestDto {
  @ApiProperty({ example: 5, description: '요청 ID (매칭 요청 고유 ID)' })
  requestId: number;

  @ApiProperty({ example: true, description: '요청 수락 여부 (true: 수락, false: 거절)' })
  accepted: boolean;
}
