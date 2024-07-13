import mongoose from 'mongoose';
import { Exam } from '../exam/exam.schema';
import { Course } from '../course/course.schema';
import { School } from '../school/school.schema';
import { Branch } from '../branch/branch.schema';
import { Student } from '../student/student.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Attendance } from '../attendance/attendance.schema';

@Schema({ timestamps: true })
export class Enrollment {
  @Prop({ required: true, default: 'ACTIVE' })
  status: string;

  @Prop({ required: true, default: 'UNPAID' })
  paymentStatus: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'School' })
  school: School;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Branch' })
  branch: Branch;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
  course: Course;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Exam' })
  exam: Exam;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Student' })
  student: Student;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }] })
  attendances: Attendance[];
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);
