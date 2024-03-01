/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './student.schema';
import { Model } from 'mongoose';
import { School } from 'src/school/school.schema';
import AuthService from 'src/auth/auth.service';

@Injectable()
class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
    @InjectModel(School.name) private schoolModel: Model<School>,
    private readonly authService: AuthService,
  ) {}

  async getStudentById(studentId: string) {
    try {
      console.log(`StudentService.getStudentById: ${studentId}`);

      // const result = await this.prisma.student.findUnique({
      //   where: {
      //     id: studentId,
      //   },
      // });

      // if (!result) {
      //   throw new HttpException('Student not found!', 404);
      // }

      // return result;
    } catch (error) {
      console.error(`StudentService.getStudentById: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async getAllStudentsBySchoolId(school: string) {
    try {
      console.log(`StudentService.getAllStudentsBySchoolId: ${school}`);
      const result = await this.studentModel.find({ school }).exec();

      if (!result) {
        throw new HttpException('No students found!', 404);
      }

      return result;
    } catch (error) {
      console.error(
        `StudentService.getAllStudentsBySchoolId: ${JSON.stringify(error)}`,
      );
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async updateStudentById(studentId, student) {
    try {
      console.log(`StudentService.updateStudentById: ${studentId}`);

      // const result = await this.prisma.student.update({
      //   where: {
      //     id: studentId,
      //   },
      //   data: student,
      // });

      // if (!result) {
      //   throw new HttpException('Student not found!', 404);
      // }

      // return result;
    } catch (error) {
      console.error(
        `StudentService.updateStudentById: ${JSON.stringify(error)}`,
      );
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async register(student): Promise<string> {
    try {
      console.log(`StudentService.register: ${student.name} | ${student.email}`);
      const school = await this.schoolModel.findById(student.school);
      student = await new this.studentModel({ ...student, school }).save();
      await school.updateOne({
        $push: { students: student._id },
      });
      const token: string = this.authService.generateToken(student);
      return token;
    } catch (error) {
      console.log(error);
      console.error(`StudentService.register: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async login({ email, password }): Promise<string> {
    try {
      console.log(`StudentService.login: ${email}`);
      const school: School = await this.schoolModel
        .findOne({ email, password })
        .exec();

      if (!school) {
        throw new HttpException('Account not found!', 401);
      }

      const token: string = this.authService.generateToken(school);
      return token;
    } catch (error) {
      console.error(`StudentService.login: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }
}

export default StudentService;
