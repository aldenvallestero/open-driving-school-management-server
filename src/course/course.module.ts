import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Course, CourseSchema } from './course.schema';
import { MongooseModule } from '@nestjs/mongoose';
import AuthService from 'src/auth/auth.service';
import { School, SchoolSchema } from 'src/school/school.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: School.name, schema: SchoolSchema },
    ]),
  ],
  providers: [CourseService, AuthService],
  controllers: [CourseController],
})
export class CourseModule {}
