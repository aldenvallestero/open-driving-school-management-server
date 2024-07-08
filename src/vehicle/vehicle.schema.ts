import mongoose from 'mongoose';
import { Branch } from '../branch/branch.schema';
import { School } from '../school/school.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Vehicle {
  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  type: string;
  enum: ['MOTORCYCLE', 'SEDAN', 'SUV', 'MPV'];

  @Prop()
  plateNumber: string;

  @Prop()
  validity: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'School' })
  school: School;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Branch' })
  branch: Branch;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
