import { Module } from '@nestjs/common';
import { UserPatternService } from './service/user-pattern.service';

@Module({
  providers: [UserPatternService]
})
export class UserPatternModule {}
