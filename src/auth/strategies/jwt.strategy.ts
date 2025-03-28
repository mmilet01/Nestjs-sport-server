import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../../shared/types';
import { UsersService } from '../../users/users.service';
import { SECRET } from '../../envConstants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get(SECRET)!,
    });
  }

  async validate(payload: TokenPayload) {
    const user = await this.userService.findByEmail(payload.email);

    if (!user) return null;
    return {
      userId: user.id,
      email: user.email,
      roleId: user.role.id,
    };
  }
}
