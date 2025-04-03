import { Injectable} from '@nestjs/common';
import { PrismaService } from '../../common';
import { SignUpDto, SignInDto } from '../model/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async signUp(signUpDto: SignUpDto) {
    return await this.prismaService.user.create({
      data: signUpDto,
    });
  }

  async signIn(signInDto: SignInDto) {
    return await this.prismaService.user.findUnique({
      where: { email: signInDto.email },
    });
  }
}

