import mongoose from 'mongoose';
import { Exam } from '../exam/exam.schema';
import { Course } from '../course/course.schema';
import { Branch } from '../branch/branch.schema';
import { School } from '../school/school.schema';
import { Attendance } from '../attendance/attendance.schema';
import { Enrollment } from '../enrollment/enrollment.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Student {
  @Prop({ required: true })
  studentId: string;

  @Prop({ required: true })
  firstName: string;

  @Prop()
  middleName: string;

  @Prop()
  lastName: string;

  @Prop()
  marriageLastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  gender: string;

  @Prop()
  birthday: string;

  @Prop()
  ltoClientId: string;

  @Prop()
  password: string;

  @Prop({ required: true, default: 'Unverified' })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'School' })
  school: School;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Branch' })
  branch: Branch;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment' }] })
  enrollment: Enrollment[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }] })
  attendances: Attendance[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] })
  courses: Course[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }] })
  exams: Exam[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
