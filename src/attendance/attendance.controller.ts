import {
  Get,
  Req,
  Post,
  Param,
  Patch,
  Query,
  UseGuards,
  Controller,
  Body,
} from '@nestjs/common';
import { AttendanceGuard } from './attendance.guard';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @UseGuards(AttendanceGuard)
  @Post()
  async createAttendance(@Req() { payload }, @Body() data) {
    return await this.attendanceService.createAttendance(payload, data);
  }

  @UseGuards(AttendanceGuard)
  @Post(':courseId')
  async clockIn(@Req() { payload }, @Param('courseId') courseId: string) {
    return await this.attendanceService.clockIn(payload, courseId);
  }

  @UseGuards(AttendanceGuard)
  @Get('search')
  async searchAttendance(
    @Req() { payload },
    @Query() { course, createdAt, keywords },
  ) {
    return await this.attendanceService.searchAttendance(
      payload._id,
      course,
      createdAt,
      keywords,
    );
  }

  @UseGuards(AttendanceGuard)
  @Get(':courseId')
  async calculateTotalHours(
    @Req() { payload },
    @Param('courseId') courseId: string,
  ) {
    return await this.attendanceService.calculateTotalHours(payload, courseId);
  }

  @UseGuards(AttendanceGuard)
  @Get()
  async getAttendancesBySchoolId(@Req() { payload }) {
    return await this.attendanceService.getAttendancesBySchoolId(payload);
  }

  // @UseGuards(AttendanceGuard)
  // @Get()
  // async getAttendanceByFilter(
  //   @Query('school') school: string,
  //   @Query('course') course: string,
  //   @Query('student') student: string,
  // ) {
  //   return await this.attendanceService.getAttendanceByFilter({
  //     school,
  //     course,
  //     student,
  //   });
  // }

  @UseGuards(AttendanceGuard)
  @Patch(':courseId')
  async clockOut(@Req() { payload }, @Param('courseId') courseId: string) {
    return await this.attendanceService.clockOut(payload, courseId);
  }

  @UseGuards(AttendanceGuard)
  @Patch('status/:attendanceId')
  async updateAttendanceStatusById(
    @Param('attendanceId') attendanceId: string,
    @Query('status') status: string,
  ) {
    return await this.attendanceService.updateAttendanceStatusById(
      attendanceId,
      status,
    );
  }
}
