import {
  Get,
  Req,
  Post,
  Body,
  UsePipes,
  UseGuards,
  Controller,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import SchoolService from './school.service';
import { LoginDto, RegisterDto } from './dto';
import { SchoolGuard } from './school.guard';

@UsePipes(new ValidationPipe())
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.schoolService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.schoolService.login(loginDto);
  }

  @UseGuards(SchoolGuard)
  @Get()
  async getSchool(@Req() { payload }) {
    return await this.schoolService.getSchool(payload);
  }

  @Get(':school')
  async getSchoolById(@Param('school') school: string) {
    return await this.schoolService.getSchoolById(school);
  }
}
