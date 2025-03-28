import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { TokenPayload } from '../../shared/types';

@Injectable()
// extending strategy from passport-local library
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // We can pass an options object in the call to super() to customize the behavior of the passport strategy.
    super({ usernameField: 'email' });
  }

  async validate(username: string, password: string): Promise<TokenPayload> {
    const employee = await this.authService.validateUser(username, password);

    return employee;
  }

  //whatever gets returned from validate method inside our local strategy automatically gets added to the request object as user
}
