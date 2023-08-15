import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({ data: createUserDto });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.prisma.user.findUnique({ where: { email } });
  }
}
