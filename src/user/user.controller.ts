import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('all')
  async findAll() {
    const res = await this.userService.findAll();
    if (res?.length) {
      return res;
    }
    return { message: 'no record found', data: [] };
  }
}
