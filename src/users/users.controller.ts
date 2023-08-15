import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller({
  path: 'users',
  version: '1', // This is for versioning
})
@ApiTags('users') // This is to group endpoint on Swagger
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard) // The user must be authenticated to access this endpoint
  @ApiBearerAuth() // This is to add the "Authorize" button on Swagger
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
