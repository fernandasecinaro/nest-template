// src/users/entities/user.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  // Only add this decorator to the properties that you want to expose on Swagger
  @ApiProperty()
  id: number;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  dateOfBirth: Date;

  @ApiProperty()
  gender: $Enums.Gender;

  // As @ApiProperty() is not used, this property is not exposed on Swagger
  @Exclude() // Decorator to not expose this property to the client
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  role: $Enums.Role;
}
