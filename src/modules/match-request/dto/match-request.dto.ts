export class CreateMatchRequestDto {
    senderId: number;
    receiverId: number;
  }
  
  export class RespondMatchRequestDto {
    requestId: number;
    accepted: boolean;
  }
  