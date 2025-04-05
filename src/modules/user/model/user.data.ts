import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, IsDate, Min, IsNumber } from 'class-validator';

export class UserData {
  @ApiProperty({ example: 'userId', description: '사용자 ID' })
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  public readonly id: number;

  @ApiProperty({ example: 'user@example.com', description: '사용자 이메일' })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({ example: '홍길동', description: '이름' })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({ example: '2001-02-01T00:00:00.000Z', description: '생년월일' })
  @IsDate()
  @IsNotEmpty()
  public birthdate: Date;

  @ApiProperty({ example: '남성', description: '성별' })
  @IsString()
  @IsNotEmpty()
  public gender: string;

  @ApiProperty({ example: '대한민국', description: '국적' })
  @IsString()
  @IsNotEmpty()
  public country: string;

  @ApiProperty({ example: '경희대학교', description: '대학명' })
  @IsString()
  @IsNotEmpty()
  public university: string;

  @ApiProperty({ example: '컴퓨터공학과', description: '학과' })
  @IsString()
  @IsNotEmpty()
  public department: string;

  @ApiProperty({ example: '2020105601', description: '학번' })
  @IsString()
  @IsNotEmpty()
  public studentId: string;

  public constructor(entity: User) {
    this.id = entity.id;
    this.email = entity.email;
    this.name = entity.name;
    this.birthdate = entity.birthdate;
    this.country = entity.country;
    this.university = entity.university;
    this.department = entity.department;
    this.studentId = entity.studentId;
  }
}
