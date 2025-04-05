import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Config, PrismaService } from '../../';
import { Service } from '../../../tokens';
import { UserData } from '../../model/user.data';

@Injectable()
export class AuthService {
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        @Inject(Service.CONFIG)
        private readonly config: Config
    ) {}

    public async findUserById(id: number): Promise<UserData | null> {
        const user = await this.prismaService.user.findUnique({
            where: { id },
        });
        if (user) {
            return new UserData(user);
        }
        return null;
    }

    public async createAccessToken(userId: number): Promise<string> {
        return this.jwtService.signAsync(
            { id: userId },
            {
                expiresIn: this.config.JWT_EXPIRATION,
                secret: this.config.JWT_SECRET,
            }
        );
    }
}
