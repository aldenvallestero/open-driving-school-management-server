import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import StudentService from './student.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@UsePipes(new ValidationPipe())
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('login')
  async login(@Body() loginData: LoginDto) {
    return await this.studentService.login(loginData);
  }

  @Post('register')
  async register(@Body() registerData: RegisterDto) {
    return await this.studentService.register(registerData);
  }

  @Get(':id')
  async getStudentById(@Param('id') studentId: string) {
    return await this.studentService.getStudentById(studentId);
  }

  @Get('all/:id')
  async getAllStudentsBySchoolId(@Param('id') schoolId: string) {
    return await this.studentService.getAllStudentsBySchoolId(schoolId);
  }

  @Put(':id')
  async updateStudentById(
    @Param('id') studentId: string,
    @Body() studentData: RegisterDto,
  ) {
    return await this.studentService.updateStudentById(studentId, studentData);
  }
}
