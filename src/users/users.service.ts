import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    await this.checkEmailIsNotUsed(createUserDto);

    const hashedPassword = await this.hashPassword(createUserDto);
    createUserDto.password = hashedPassword;

    return await this.usersRepository.createUser(createUserDto);
  }

  private async checkEmailIsNotUsed(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOneByEmail(createUserDto.email);

    if (user) {
      throw new BadRequestException('Email already registered');
    }
  }

  private async hashPassword(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    return hashedPassword;
  }

  async findAll() {
    return [];
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOneByEmail(email);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
