import { Module } from '@nestjs/common';
import StudentService from './student.service';
import AuthService from '../auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentController } from './student.controller';
import { Student, StudentSchema } from './student.schema';
import { School, SchoolSchema } from '../school/school.schema';
import { Course, CourseSchema } from '../course/course.schema';
import { Branch, BranchSchema } from '../branch/branch.schema';
import { Enrollment, EnrollmentSchema } from '../enrollment/enrollment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: School.name, schema: SchoolSchema },
      { name: Branch.name, schema: BranchSchema },
      { name: Course.name, schema: CourseSchema },
      { name: Student.name, schema: StudentSchema },
      { name: Enrollment.name, schema: EnrollmentSchema },
    ]),
  ],
  providers: [StudentService, AuthService],
  controllers: [StudentController],
})
export class StudentModule {}
