import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import StudentService from './student.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './student.schema';
import { School, SchoolSchema } from 'src/school/school.schema';
import AuthService from 'src/auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
      { name: School.name, schema: SchoolSchema },
    ]),
  ],
  providers: [StudentService, AuthService],
  controllers: [StudentController],
})
export class StudentModule {}
