import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  Login() {
    return this.authService.login();
  }

  @Post('signup')
  Signup(@Body() dto: AuthDto) {
    console.log({ dto });
    return this.authService.signup();
  }
}
