import mongoose from 'mongoose';
import { Course } from '../course/course.schema';
import { Branch } from '../branch/branch.schema';
import { School } from '../school/school.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Note {
  @Prop({ required: true })
  body: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
  course: Course;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Branch' })
  branch: Branch;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'School' })
  school: School;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
