import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(data: { email: string; name?: string }) {
    return this.prisma.user.create({
      data,
    });
  }

  async findAll() {
    const res = await this.prisma.user.findMany();
    if (res.length) {
      return res;
    } else {
      return [];
    }
  }

  async findOne(id: number) {
    const res = await this.prisma.user.findUnique({
      where: { id },
    });
    if (res) {
      return res;
    } else {
      return null;
    }
  }

  async update(id: number, data: { name?: string }) {
    const userExist = await this.findOne(id);
    if (userExist) {
      return this.prisma.user.update({
        where: { id },
        data,
      });
    } else {
      return { message: 'no user found' };
    }
  }

  async remove(id: number) {
    const userExist = await this.findOne(id);
    if (userExist) {
      return this.prisma.user.delete({
        where: { id },
      });
    } else {
      return { message: 'no user found' };
    }
  }
}
