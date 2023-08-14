import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// This is inferred from the CreateUserDto
export class UpdateUserDto extends PartialType(CreateUserDto) {}
