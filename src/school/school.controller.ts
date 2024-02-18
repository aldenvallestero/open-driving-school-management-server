import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import SchoolService from './school.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@UsePipes(new ValidationPipe())
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post('login')
  async login(@Body() loginData: LoginDto) {
    return await this.schoolService.login(loginData);
  }
  @Post('register')
  async register(@Body() registerData: RegisterDto) {
    return await this.schoolService.register(registerData);
  }

  @Get(':id')
  async getSchoolById(@Param('id') schoolId: string) {
    return await this.schoolService.getSchoolById(schoolId);
  }
}
