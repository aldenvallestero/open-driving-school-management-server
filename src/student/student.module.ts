import { Module } from '@nestjs/common';
import StudentService from './student.service';
import AuthService from 'src/auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentController } from './student.controller';
import { Student, StudentSchema } from './student.schema';
import { School, SchoolSchema } from 'src/school/school.schema';
import { Course, CourseSchema } from 'src/course/course.schema';
import { Branch, BranchSchema } from 'src/branch/branch.schema';
import { Enrollment, EnrollmentSchema } from 'src/enrollment/enrollment.schema';

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
