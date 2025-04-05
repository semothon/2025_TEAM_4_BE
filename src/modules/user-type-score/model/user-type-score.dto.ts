import { IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TestUserTypeScoreDto {
  @ApiProperty({ minimum: 0, maximum: 15 })
  @IsInt() @Min(0) @Max(15)
  public cleanliness: number;

  @ApiProperty({ minimum: 0, maximum: 15 })
  @IsInt() @Min(0) @Max(15)
  public noise: number;

  @ApiProperty({ minimum: 0, maximum: 15 })
  @IsInt() @Min(0) @Max(15)
  public sharedItems: number;

  @ApiProperty({ minimum: 0, maximum: 15 })
  @IsInt() @Min(0) @Max(15)
  public communication: number;

  @ApiProperty({ minimum: 0, maximum: 15 })
  @IsInt() @Min(0) @Max(15)
  public sleepPattern: number;

  @ApiProperty({ minimum: 0, maximum: 15 })
  @IsInt() @Min(0) @Max(15)
  public sensitivity: number;

  @ApiProperty({ minimum: 0, maximum: 15 })
  @IsInt() @Min(0) @Max(15)
  public patience: number;

  @ApiProperty({ minimum: 0, maximum: 15 })
  @IsInt() @Min(0) @Max(15)
  public attention: number;

  @ApiProperty()
  @IsInt()
  public userId: number;
}

export class SubmitUserTypeScoreDto {
    @IsInt()
    public userId: number;
  
    @IsInt() @Min(0) @Max(15)
    public cleanliness: number;
  
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