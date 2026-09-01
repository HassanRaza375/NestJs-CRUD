import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  Login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @Post('signup')
  Signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }
}
