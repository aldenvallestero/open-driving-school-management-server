import { Module } from '@nestjs/common';
import AuthService from 'src/auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import StudentService from 'src/student/student.service';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { School, SchoolSchema } from 'src/school/school.schema';
import { Course, CourseSchema } from 'src/course/course.schema';
import { Branch, BranchSchema } from 'src/branch/branch.schema';
import { Attendance, AttendanceSchema } from './attendance.schema';
import { Student, StudentSchema } from 'src/student/student.schema';
import { Enrollment, EnrollmentSchema } from 'src/enrollment/enrollment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: School.name, schema: SchoolSchema },
      { name: Course.name, schema: CourseSchema },
      { name: Branch.name, schema: BranchSchema },
      { name: Student.name, schema: StudentSchema },
      { name: Attendance.name, schema: AttendanceSchema },
      { name: Enrollment.name, schema: EnrollmentSchema },
    ]),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService, AuthService, StudentService],
})
export class AttendanceModule {}
