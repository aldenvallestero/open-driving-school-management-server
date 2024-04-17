import {
  Get,
  Put,
  Req,
  Post,
  Body,
  Param,
  UsePipes,
  UseGuards,
  Controller,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import StudentService from './student.service';
import { StudentGuard } from './student.guard';
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

  @UseGuards(StudentGuard)
  @Post('enroll')
  async enroll(@Req() { payload }, @Body() course: object) {
    return await this.studentService.enroll(payload, course);
  }

  @UseGuards(StudentGuard)
  @Get('search')
  async searchStudentsBySchoolId(
    @Req() { payload },
    @Query('filter') filter: string,
  ) {
    return await this.studentService.searchStudentsBySchoolId(
      payload._id,
      filter,
    );
  }

  @UseGuards(StudentGuard)
  @Get('profile')
  async getStudent(@Req() { payload }) {
    return await this.studentService.getStudent(payload._id);
  }

  @UseGuards(StudentGuard)
  @Get(':studentId')
  async getStudentsById(@Param('studentId') studentId: string) {
    return await this.studentService.getStudentById(studentId);
  }

  @UseGuards(StudentGuard)
  @Get()
  async getStudentsBySchoolId(
    @Req() { payload },
    // @Query('school') school: string,
    // @Query('course') course: string,
    // @Query('student') student: string,
  ) {
    return await this.studentService.getStudentsBySchoolId({
      school: payload._id,
    });
  }

  @Put(':id')
  async updateStudentById(
    @Param('id') studentId: string,
    // @Body() studentData: RegisterDto,
  ) {
    return await this.studentService.updateStudentById(studentId);
  }
}
