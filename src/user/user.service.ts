import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
    return this.prisma.user.findMany();
  }
  findOne(user: any) {
    console.log('logged', user);
    return this.prisma.user.findUnique({
      where: {
        id: user?.sub,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });
  }
}
