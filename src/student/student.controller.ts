import {
  Body,
  Controller,
  Post,
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
}
