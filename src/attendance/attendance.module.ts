import { Module } from '@nestjs/common';
import AuthService from '../auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import StudentService from '../student/student.service';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { School, SchoolSchema } from '../school/school.schema';
import { Course, CourseSchema } from '../course/course.schema';
import { Branch, BranchSchema } from '../branch/branch.schema';
import { Attendance, AttendanceSchema } from './attendance.schema';
import { Student, StudentSchema } from '../student/student.schema';
import { Enrollment, EnrollmentSchema } from '../enrollment/enrollment.schema';

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
