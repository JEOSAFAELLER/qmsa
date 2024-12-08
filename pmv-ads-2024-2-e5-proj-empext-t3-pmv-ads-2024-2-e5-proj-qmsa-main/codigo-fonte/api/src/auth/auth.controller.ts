import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ISignInDto } from './dtos/SignInDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async singIn(@Body() login: ISignInDto) {
    return this.authService.signIn(login);
  }
}
