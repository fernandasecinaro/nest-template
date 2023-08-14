import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data: createUserDto });
  }
}
