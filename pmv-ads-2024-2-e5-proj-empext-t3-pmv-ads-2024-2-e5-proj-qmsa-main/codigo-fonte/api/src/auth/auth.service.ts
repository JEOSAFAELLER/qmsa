import { BadRequestException, Injectable } from '@nestjs/common';
import { ISignInDto } from './dtos/SignInDto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(login: ISignInDto) {
    const user = await this.userService.findByEmail(login.email);
    const passwordDescrypted = await bcrypt.compare(
      login.password,
      user.password,
    );

    if (!passwordDescrypted) {
      throw new BadRequestException('A senha informada está incorreta');
    }

    const payload = { sub: user.id, email: user.email };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
