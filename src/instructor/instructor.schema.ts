import mongoose from 'mongoose';
import { School } from '../school/school.schema';
import { Student } from '../student/student.schema';
import { Attendance } from '../attendance/attendance.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Instructor {
  @Prop({ required: true })
  address: string;

  @Prop()
  contactNumber: string;

  @Prop()
  contactPerson: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'School' })
  school: School;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }] })
  attendances: Attendance[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }] })
  students: Student[];
}

export const InstructorSchema = SchemaFactory.createForClass(Instructor);
