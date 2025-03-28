import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../shared/decorators/constants';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { LocalAuthGuard } from '../shared/guards/local-auth.guard';
import { TokenPayload } from '../shared/types';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: TokenPayload) {
    // after using local auth guard we can assume that login was successfull here so we assign token
    return this.authService.login(user);
  }

  @Post('register')
  @Public()
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
