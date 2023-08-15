import {
  IsEmail,
  IsNotEmpty,
  IsDateString,
  MinLength,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsEmail()
  email: string;

  @IsDateString()
  dateOfBirth: Date;
}
