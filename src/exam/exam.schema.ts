import mongoose from 'mongoose';
import { Course } from '../course/course.schema';
import { School } from '../school/school.schema';
import { Student } from '../student/student.schema';
import { Enrollment } from '../enrollment/enrollment.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Exam {
  @Prop({ required: true, default: 0 })
  score: number;

  @Prop({ required: true })
  pass: boolean;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'School' } })
  school: School;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' } })
  course: Course;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment' } })
  enrollment: Enrollment;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' } })
  student: Student;
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
