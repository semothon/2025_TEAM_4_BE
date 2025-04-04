import { IsBoolean, IsDateString, IsInt, IsNumber, IsString, Min, Max } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateUserPatternDto {
  @IsDateString()
  sleepTime: string;

  @IsDateString()
  wakeTime: string;

  @IsBoolean()
  isSmoker: boolean;

  @IsBoolean()
  isDrinker: boolean;

  @IsInt()
  @Min(1)
  cleaningCycle: number;

  @IsInt()
  @Min(1)
  @Max(5)
  noiseSensitivity: number;

  @IsBoolean()
  allowVisitors: boolean;

  @IsInt()
  @Min(0)
  @Max(24)
  studyHours: number;

  @IsNumber()
  preferredTemperature: number;

  @IsString()
  personality: string;

  @IsInt()
  userId: number;
}

export class UpdateUserPatternDto extends PartialType(CreateUserPatternDto) {}

