import { PartialType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsInt} from 'class-validator';

export class CreateUserPatternDto {
  @IsInt()
  public userId: number;
  public userInfo: Prisma.InputJsonValue;
}

export class UpdateUserPatternDto extends PartialType(CreateUserPatternDto) {}
