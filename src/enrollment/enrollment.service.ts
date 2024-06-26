import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Enrollment } from './enrollment.schema';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectModel(Enrollment.name) private enrollmentModel: Model<Enrollment>,
  ) {}

  async createEnrollment(student, course) {
    const enrollment = await new this.enrollmentModel({
      school: student.school,
      branch: student.branch,
      course: course._id,
    }).save();

    // await Promise.all([
    //   enrollment.school.updateOne({
    //     $push: { enrollment: enrollment._id },
    //   }),
    //   enrollment.branch.updateOne({
    //     $push: { enrollment: enrollment._id },
    //   }),
    //   enrollment.course.updateOne({
    //     $push: { enrollment: enrollment._id },
    //   }),
    //   enrollment.student.updateOne({
    //     $push: { enrollment: enrollment._id },
    //   }),
    // ]);
  }
}
