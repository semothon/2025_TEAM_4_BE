import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt, IsNumber, IsString, Min, Max } from 'class-validator';

export class CreateUserPatternDto {
  @IsDateString()
  public sleepTime: string;

  @IsDateString()
  public wakeTime: string;

  @IsBoolean()
  public isSmoker: boolean;

  @IsBoolean()
  public isDrinker: boolean;

  @IsInt()
  @Min(1)
  public cleaningCycle: number;

  @IsInt()
  @Min(1)
  @Max(5)
  public noiseSensitivity: number;

  @IsBoolean()
  public allowVisitors: boolean;

  @IsInt()
  @Min(0)
  @Max(24)
  public studyHours: number;

  @IsNumber()
  public preferredTemperature: number;

  @IsString()
  public personality: string;

  @IsInt()
  public userId: number;
}

export class UpdateUserPatternDto extends PartialType(CreateUserPatternDto) {}
