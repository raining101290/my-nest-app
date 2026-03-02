/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '../user.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @MinLength(6)
  password: string;

  @MinLength(11)
  phone: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
