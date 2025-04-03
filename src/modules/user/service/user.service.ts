import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../common';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async signUp(
        email: string,
        password: string,
        name: string,
        birthdate: Date,
        gender: string,
        country: string,
        university: string,
        department: string,
        studentId: string
    ): Promise<User> {
        // 이미 가입된 이메일인지 확인
        const existingUser = await this.prismaService.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new ConflictException('이미 가입된 이메일입니다.');
        }

        // 새 사용자 생성
        return await this.prismaService.user.create({
            data: {
                email,
                password, 
                name,
                birthdate,
                gender,
                country,
                university,
                department,
                studentId,
            },
        });
    }

    async signIn(email: string, password: string): Promise<User> {
        // 사용자 조회
        const user = await this.prismaService.user.findUnique({
            where: { email },
        });

        if (!user || user.password !== password) {
            throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
        }

        return user;
    }

    
}
