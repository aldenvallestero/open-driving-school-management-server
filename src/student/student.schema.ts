import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Attendance } from 'src/attendance/attendance.schema';
import { Course } from 'src/course/course.schema';
import { Exam } from 'src/exam/exam.schema';
import { School } from 'src/school/school.schema';

@Schema()
export class Student {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  ltoClientId: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: 'Active' })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'School' })
  school: School;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }] })
  attendances: Attendance[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] })
  courses: Course[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }] })
  exams: Exam[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
