import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { TokenPayload } from '../shared/types';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  createToken(payload: TokenPayload) {
    const options: JwtSignOptions = {
      expiresIn: '7d', // extract from env
      secret: 'SECRET',
    };
    const token = this.jwtService.sign(payload, options);

    return token;
  }

  verifyToken(token: string): TokenPayload {
    return this.jwtService.verify(token);
  }
}
