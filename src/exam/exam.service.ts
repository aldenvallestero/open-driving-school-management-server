import { Model } from 'mongoose';
import { Exam } from './exam.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ExamService {
  constructor(@InjectModel(Exam.name) private examModel: Model<Exam>) {}

  async getAllExamBySchoolId(school: string) {
    return await this.examModel.find({ where: school });
  }

  async getAllExamByCourseId(course: string) {
    return await this.examModel.find({ where: course });
  }

  async getAllExamByStudentId(student: string) {
    return await this.examModel.find({ where: student });
  }
}
