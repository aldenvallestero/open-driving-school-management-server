import { Model } from 'mongoose';
import { Student } from './student.schema';
import ShortUniqueId from 'short-unique-id';
import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import AuthService from 'src/auth/auth.service';
import { Branch } from 'src/branch/branch.schema';
import { School } from 'src/school/school.schema';
import { Course } from 'src/course/course.schema';
import { Enrollment } from 'src/enrollment/enrollment.schema';

@Injectable()
class StudentService {
  uid: ShortUniqueId;

  constructor(
    @InjectModel(School.name) private schoolModel: Model<School>,
    @InjectModel(Branch.name) private branchModel: Model<Branch>,
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(Student.name) private studentModel: Model<Student>,
    @InjectModel(Enrollment.name) private enrollmentModel: Model<Enrollment>,
    private readonly authService: AuthService,
  ) {
    this.uid = new ShortUniqueId({ length: 10, dictionary: 'alphanum_upper' });
  }

  private paginate(data) {
    return data;
  }

  private async generateStudentId(school: string): Promise<string> {
    const year: string = new Date().getFullYear().toString().substring(2);
    let studentCount: number | string = await this.studentModel.countDocuments({
      school,
    });
    studentCount = (studentCount + 1).toString();
    let result = '';
    switch (studentCount.length) {
      case 1:
        result = year + '0000' + studentCount;
        break;
      case 2:
        result = year + '000' + studentCount;
        break;
      case 3:
        result = year + '00' + studentCount;
        break;
      case 4:
        result = year + '0' + studentCount;
        break;
      case 5:
        result = year + studentCount;
        break;
    }

    return result;
  }

  private generateStudentPassword(): string {
    return this.uid.rnd();
  }

  async getStudent(studentId: string) {
    try {
      const result = await this.studentModel
        .findById(studentId)
        .populate('courses')
        .populate({
          path: 'enrollment',
          populate: {
            path: 'course',
          },
        })
        .exec();

      return result;
    } catch (error) {
      console.error(`StudentService.getStudentById: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async getStudentById(studentId: string) {
    try {
      const result: any = await this.studentModel
        .findById(studentId)
        .populate('courses')
        .populate({
          path: 'enrollment',
          populate: {
            path: 'course',
          },
        })
        .exec();

      return result;
    } catch (error) {
      console.error(`StudentService.getStudentById: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  /**
   * Get student record by it's school student id
   * @param studentId - string: 240000001
   * @returns Promise<object>
   */
  async getStudentByStudentId(studentId: string) {
    try {
      const result: any = await this.studentModel
        .findOne({ studentId })
        .populate('courses')
        .populate({
          path: 'enrollment',
          populate: {
            path: 'course',
          },
        })
        .exec();

      return result;
    } catch (error) {
      console.error(
        `StudentService.getStudentByStudentId: ${JSON.stringify(error)}`,
      );
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async getStudentsBySchoolId(filter) {
    Object.keys(filter).forEach(
      (key) => filter[key] === undefined && delete filter[key],
    );

    const result = await this.studentModel
      .find({ ...filter })
      .populate('branch');
    return this.paginate(result);
  }

  async searchStudentsBySchoolId(school, filter: string) {
    const result = await this.studentModel.find({ school }).populate('branch');
    const keywords = filter.split(' ');
    const filteredStudents = [];
    result.forEach((student) => {
      keywords.forEach((key) => {
        if (JSON.stringify(student).toLowerCase().includes(key.toLowerCase())) {
          filteredStudents.push(student);
        }
      });
    });
    return this.paginate(filteredStudents);
  }

  async updateStudentById(studentId) {
    try {
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
      const { isCreatedBySchool } = student;

      const [studentId, school, branch, course] = await Promise.all([
        this.generateStudentId(student.school),
        this.schoolModel.findById(student.school),
        this.branchModel.findById(student.branch),
        this.courseModel.findById(student.course),
      ]);

      student = new this.studentModel({ studentId, ...student });

      const enrollment = await new this.enrollmentModel({
        school: school._id,
        branch: branch._id,
        course: course._id,
        student: student._id,
      }).save();

      await Promise.all([
        student.updateOne({
          $push: {
            courses: course._id,
            enrollment: enrollment._id,
          },
        }),
        school.updateOne({
          $push: { students: student._id },
        }),
        branch.updateOne({
          $push: { students: student._id },
        }),
        course.updateOne({
          $push: { students: student._id },
        }),
      ]);

      if (isCreatedBySchool) {
        student.status = 'Verified';
        student.password = this.generateStudentPassword();
        student.temporaryPassword = student.password;
      }

      await student.save();

      if (isCreatedBySchool) {
        // TODO: Send an email to student
        return student;
      }

      const token: string = this.authService.generateToken(student);
      return token;
    } catch (error) {
      console.error(`StudentService.register: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async login({ email, password }): Promise<string> {
    try {
      const student: Student = await this.studentModel
        .findOne({ email, password })
        .exec();

      if (!student) {
        throw new HttpException('Student not found!', 401);
      }

      const token: string = this.authService.generateToken(student);
      return token;
    } catch (error) {
      console.error(`StudentService.login: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async enroll(student, course) {
    try {
      await student.updateOne({
        $push: { courses: course._id },
      });
      await course.updateOne({
        $push: { students: student._id },
      });
      return;
    } catch (error) {
      console.error(`StudentService.enroll: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }
}

export default StudentService;
