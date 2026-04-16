import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query('role') role?: 'admin' | 'customer' | 'manager') {
    return this.userService.findAll(role);
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }
  @Post()
  create(@Body() user: { name: string; role: string }) {
    return this.userService.create(user);
  }
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: { name: string; role: string },
  ) {
    return this.userService.update(id, user);
  }
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
