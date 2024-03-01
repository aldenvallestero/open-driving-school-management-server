import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Course } from 'src/course/course.schema';
import { School } from 'src/school/school.schema';
import { Student } from 'src/student/student.schema';

@Schema()
export class Attendance {
  @Prop({ required: true, default: new Date() })
  in: Date;

  @Prop({ required: true })
  out: Date;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'School' } })
  school: School;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' } })
  course: Course;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' } })
  student: Student;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
