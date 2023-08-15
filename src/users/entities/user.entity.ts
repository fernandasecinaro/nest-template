import { ApiHideProperty } from '@nestjs/swagger';
import { $Enums, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  id: number;
  fullName: string;
  dateOfBirth: Date;
  gender: $Enums.Gender;
  email: string;
  createdAt: Date;
  role: $Enums.Role;

  // As @ApiHideProperty() is used, this property is not exposed on Swagger
  @ApiHideProperty()
  @Exclude() // Decorator to not expose this property to the client
  password: string;
}
