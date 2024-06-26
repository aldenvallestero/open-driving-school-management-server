import mongoose from 'mongoose';
import { Course } from 'src/course/course.schema';
import { School } from 'src/school/school.schema';
import { Branch } from 'src/branch/branch.schema';
import { Student } from 'src/student/student.schema';
import { Enrollment } from 'src/enrollment/enrollment.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Attendance {
  @Prop({ required: true, default: 'Credited' })
  status: string;

  @Prop()
  in: Date;

  @Prop()
  out: Date;

  @Prop()
  hours: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'School' })
  school: School;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Branch' })
  branch: Branch;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
  course: Course;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Student' })
  student: Student;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment' })
  enrollment: Enrollment;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
