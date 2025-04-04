import { IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TestUserTypeScoreDto {
  @ApiProperty({ minimum: 0, maximum: 15 })
  @IsInt() @Min(0) @Max(15)
  cleanliness: number;

  @ApiProperty({ minimum: 0, maximum: 15 })
  @IsInt() @Min(0) @Max(15)
  noise: number;

  @ApiProperty({ minimum: 0, maximum: 15 })
  @IsInt() @Min(0) @Max(15)
  sharedItems: number;

  @ApiProperty({ minimum: 0, maximum: 15 })
  @IsInt() @Min(0) @Max(15)
  communication: number;

  @ApiProperty({ minimum: 0, maximum: 15 })
  @IsInt() @Min(0) @Max(15)
  sleepPattern: number;

  @ApiProperty({ minimum: 0, maximum: 15 })
  @IsInt() @Min(0) @Max(15)
  sensitivity: number;

  @ApiProperty({ minimum: 0, maximum: 15 })
  @IsInt() @Min(0) @Max(15)
  patience: number;

  @ApiProperty({ minimum: 0, maximum: 15 })
  @IsInt() @Min(0) @Max(15)
  attention: number;

  @ApiProperty()
  @IsInt()
  userId: number;
}

export class SubmitUserTypeScoreDto {
    @IsInt()
    userId: number;
  
    @IsInt() @Min(0) @Max(15)
    cleanliness: number;
  
    @IsInt() @Min(0) @Max(15)
    noise: number;
  
    @IsInt() @Min(0) @Max(15)
    sharedItems: number;
  
    @IsInt() @Min(0) @Max(15)
    communication: number;
  
    @IsInt() @Min(0) @Max(15)
    sleepPattern: number;
  
    @IsInt() @Min(0) @Max(15)
    sensitivity: number;
  
    @IsInt() @Min(0) @Max(15)
    patience: number;
  
    @IsInt() @Min(0) @Max(15)
    attention: number;
  }