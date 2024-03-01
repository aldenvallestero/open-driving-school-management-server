import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Attendance } from './attendance.schema';
import { Model } from 'mongoose';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name) private attendanceModel: Model<Attendance>,
  ) {}
  async clockIn(attendance) {
    await new this.attendanceModel(attendance).save();
  }
  async clockOut(id, attendance) {
    return await this.attendanceModel.findByIdAndUpdate(id, attendance,{ new: true });
  }
}
