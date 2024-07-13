import { Module } from '@nestjs/common';
import AuthService from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { School, SchoolSchema } from '../school/school.schema';
import { Student, StudentSchema } from '../student/student.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: School.name, schema: SchoolSchema },
      { name: Student.name, schema: StudentSchema },
    ]),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
