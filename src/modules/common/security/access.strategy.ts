import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Config } from '../../common';
import { Service } from '../../tokens';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access') {
  public constructor(
    @Inject(Service.CONFIG)
    config: Config,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  public async validate(_req: Request, data: { id: number }) {
    return this.authService.findUserById(data.id);
  }
}
