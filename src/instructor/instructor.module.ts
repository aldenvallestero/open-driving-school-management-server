import { Module } from '@nestjs/common';
import InstructorService from './instructor.service';
import AuthService from '../auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InstructorController } from './instructor.controller';
import { Instructor, InstructorSchema } from './instructor.schema';
import { School, SchoolSchema } from '../school/school.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Instructor.name, schema: InstructorSchema },
      { name: School.name, schema: SchoolSchema },
    ]),
  ],
  providers: [InstructorService, AuthService],
  controllers: [InstructorController],
})
export class InstructorModule {}
