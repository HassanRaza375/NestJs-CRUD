import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '../../generated/prisma/client';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        password: true,
      },
    });
    if (!user?.id) {
      throw new ForbiddenException('Credentials incorrect');
    }
    const pwMatches = await bcrypt.compare(dto.password, user.password);
    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return this.signToken(user.id, user.email);
  }
  async signup(dto: AuthDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const jwt_secret = process.env.JWT_SECRET;
    const jwt_expires_in = process.env
      .JWT_EXPIRES_IN as JwtSignOptions['expiresIn'];
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: jwt_expires_in,
      secret: jwt_secret,
    });
    return {
      access_token: token,
    };
  }
}
