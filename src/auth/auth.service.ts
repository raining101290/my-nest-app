// auth/auth.service.ts

import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.entity';
import { LoginDto } from './dto/login.dto';
import { UserResponseDto } from '../user/dto/user-response.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // ========================
  // REGISTER
  // ========================
  async register(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.userService.findByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const user = await this.userService.create(createUserDto);

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      phone: user.phone,
      role: user.role,
    };
  }

  // ========================
  // VALIDATE USER (For Login)
  // ========================
  async validateUser(loginDto: LoginDto): Promise<User> {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  // ========================
  // LOGIN
  // ========================
  async login(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
