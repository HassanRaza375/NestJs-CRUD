import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import type { User } from 'generated/prisma/client';
import { GetUser } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('all')
  async findAll(@GetUser() user: User) {
    console.log({ user: user });
    const res = await this.userService.findAll();
    if (res?.length) {
      return res;
    }
    return { message: 'no record found', data: [] };
  }
  @Get('logged')
  async findOne(@GetUser() user: User) {
    const res = await this.userService.findOne(user);
    if (res?.id) {
      return res;
    }
    return { message: 'no record found', data: [] };
  }
  @Patch()
  editUser(@GetUser() user: User) {
    
  }
}
