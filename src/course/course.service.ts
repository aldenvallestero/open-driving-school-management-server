import { Model } from 'mongoose';
import { Course } from './course.schema';
import { InjectModel } from '@nestjs/mongoose';
import { School } from 'src/school/school.schema';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(School.name) private schoolModel: Model<School>,
  ) {}

  async createCourse(course): Promise<any> {
    try {
      console.log(`CourseService.createCourse: ${JSON.stringify(course)}`);
      const result = await new this.courseModel(course).save();
      await this.schoolModel.findByIdAndUpdate(course.school._id, {
        $addToSet: { courses: result._id },
      });
      return result;
    } catch (error) {
      console.error(`CourseService.createCourse: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async getCourseById(id: string): Promise<object> {
    try {
      return await this.courseModel.findById(id).exec();
    } catch (error) {
      throw new HttpException('Courses not found!', 404);
    }
  }

  async getAllCoursesBySchoolId(payload) {
    try {
      console.log(`CourseService.getAllCoursesBySchoolId`);
      const schoolId = payload?.school || payload._id; // find the schoolId
      const { courses } = await this.schoolModel
        .findById(schoolId)
        .populate('courses')
        .exec();

      return courses;
    } catch (error) {
      console.error(
        `CourseService.getAllCoursesBySchoolId: ${JSON.stringify(error)}`,
      );
      throw new HttpException('Courses not found!', 404);
    }
  }

  async getAllCoursesByStudentId(id: string) {
    try {
      console.log(`CourseService.getAllCoursesByStudentId: ${id}`);
      // const result = await this.enrolleeModel
      //   .findById(id)
      //   .populate('course')
      //   .exec();
      // return result;
    } catch (error) {
      console.error(
        `CourseService.getAllCoursesByStudentId: ${JSON.stringify(error)}`,
      );
      throw new HttpException('Courses not found!', 404);
    }
  }

  async updateCourse(id: string, course: object): Promise<any> {
    try {
      console.log(`CourseService.updateCourse`);
      return await this.courseModel.findByIdAndUpdate(id, course, {
        new: true,
      });
    } catch (error) {
      console.error(`CourseService.updateCourse: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }
}
