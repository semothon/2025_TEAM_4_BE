import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class SignUpDto {
  @ApiProperty({ example: 'user@example.com', description: '사용자 이메일' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123', description: '비밀번호' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '홍길동', description: '이름' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '2001-02-01T00:00:00.000Z', description: '생년월일' })
  @IsString()
  @IsNotEmpty()
  birthdate: string;

  @ApiProperty({ example: '남성', description: '성별' })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({ example: '대한민국', description: '국적' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: '경희대학교', description: '대학명' })
  @IsString()
  @IsNotEmpty()
  university: string;

  @ApiProperty({ example: '컴퓨터공학과', description: '학과' })
  @IsString()
  @IsNotEmpty()
  department: string;

  @ApiProperty({ example: '2020105601', description: '학번' })
  @IsString()
  @IsNotEmpty()
  studentId: string;
}

export class SignInDto {
  @ApiProperty({ example: 'user@example.com', description: '사용자 이메일' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123', description: '비밀번호' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  birthdate: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  university: string;

  @ApiProperty()
  department: string;

  @ApiProperty()
  studentId: string;
}
