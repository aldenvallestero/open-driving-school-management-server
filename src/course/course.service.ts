import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './course.schema';
import { Model } from 'mongoose';
import { School } from 'src/school/school.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(School.name) private schoolModel: Model<School>,
  ) {}

  async createCourse(course): Promise<void> {
    try {
      console.log(`SchoolService.createCourse: ${JSON.stringify(course)}`);
      const result = await new this.courseModel(course).save();
      await this.schoolModel.findByIdAndUpdate(course.school._id, {
        $addToSet: { courses: result._id },
      });
    } catch (error) {
      console.error(`SchoolService.createCourse: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async getAllCourses(filter): Promise<object[]> {
    try {
      return await this.courseModel.find(filter).exec();
    } catch (error) {
      throw new HttpException('Courses not found!', 404);
    }
  }

  async updateCourse(id: string, course: object): Promise<any> {
    try {
      console.log(`SchoolService.updateCourse`);
      return await this.courseModel.findByIdAndUpdate(id, course, {
        new: true,
      });
    } catch (error) {
      console.log(error);
      console.error(`SchoolService.updateCourse: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }
}
