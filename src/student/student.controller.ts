import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/user/user.entity';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() body: Partial<Student>) {
    return this.studentService.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.TEACHER)
  @Get()
  findAll() {
    return this.studentService.findAll();
  }
}
