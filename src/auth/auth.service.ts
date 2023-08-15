import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(loginInfo: LoginDto): Promise<any> {
    const { email, password } = loginInfo;
    const user = await this.usersService.findByEmail(email);

    const isPasswordCorrect = await bcrypt.compare(password, user?.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { password: pass, ...payload } = user;

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
