import mongoose from 'mongoose';
import { Branch } from 'src/branch/branch.schema';
import { Course } from 'src/course/course.schema';
import { Student } from 'src/student/student.schema';
import { Attendance } from 'src/attendance/attendance.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class School {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }] })
  branches: Branch[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] })
  courses: Course[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }] })
  students: Student[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }] })
  attendances: Attendance[];
}

export const SchoolSchema = SchemaFactory.createForClass(School);
