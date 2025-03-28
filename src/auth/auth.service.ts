import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { TokenService } from './token.service';
import { TokenPayload, UserInfo } from '../shared/types';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SALT } from '../envConstants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
    private tokenService: TokenService,
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
  ) {}

  async validateUser(email: string, password: string): Promise<TokenPayload> {
    if (!email || !password) throw new UnauthorizedException('Invalid Creds');

    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid Creds');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid Credss');

    const payload: TokenPayload = {
      email: user.email,
      userId: user.id,
      roleId: user.role.id,
    };

    return payload;
  }

  async register(userDto: CreateUserDto) {
    const { password } = userDto;
    const salt = this.configService.get<number>(SALT);
    const hashedPassword = await bcrypt.hash(password, salt || 10);
    const role = await this.roleRepo.findOne({ where: { name: 'user' } }); // 'user' or 'admin', as appropriate

    const user = await this.userService.create({
      email: userDto.email,
      password: hashedPassword,
      role: role!,
    });

    const tokenPayload = {
      email: user.email,
      roleId: user.role.id,
      userId: user.id,
    } as TokenPayload;

    return this.login(tokenPayload);
  }

  async login(user: TokenPayload) {
    const token = this.tokenService.createToken(user);

    const data = {
      token,
      user,
    };

    return { data };
  }
}
