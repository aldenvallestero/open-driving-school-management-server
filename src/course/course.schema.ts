import mongoose from 'mongoose';
import { School } from 'src/school/school.schema';
import { Student } from 'src/student/student.schema';
import { Attendance } from 'src/attendance/attendance.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: 0 })
  price: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'School' })
  school: School;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }] })
  students: Student[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }] })
  attendances: Attendance[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
