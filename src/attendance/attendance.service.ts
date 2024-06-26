import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Attendance } from './attendance.schema';
import { School } from 'src/school/school.schema';
import { Branch } from 'src/branch/branch.schema';
import { Course } from 'src/course/course.schema';
import StudentService from 'src/student/student.service';
import { Enrollment } from 'src/enrollment/enrollment.schema';

@Injectable()
export class AttendanceService {
  constructor(
    private studentService: StudentService,
    @InjectModel(School.name) private schoolModel: Model<School>,
    @InjectModel(Branch.name) private branchModel: Model<Branch>,
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(Attendance.name) private attendanceModel: Model<Attendance>,
    @InjectModel(Enrollment.name) private enrollmentModel: Model<Enrollment>,
  ) {}

  private paginate(data) {
    return data;
  }

  async createAttendance(payload, attendance) {
    const student = await this.studentService.getStudentByStudentId(
      attendance.student,
    );

    attendance.createdAt = attendance.date;
    attendance.student = student._id.toString();
    attendance.school = student.school._id.toString();
    attendance.branch = student.branch._id.toString();
    attendance.enrollment = student?.enrollment?.filter(
      (x) => x.status === 'Active',
    )[0];

    attendance.enrollment = attendance.enrollment._id.toString();
    attendance.course = attendance.enrollment.course._id.toString();
    attendance.date = new Date(attendance.date);
    attendance.school = payload._id.toString();
    attendance.hours = attendance.out.getHours() - attendance.in.getHours();

    const [year, month, day] = await Promise.all([
      new Date(attendance.date).getFullYear(),
      new Date(attendance.date).getMonth(),
      new Date(attendance.date).getDay(),
    ]);

    attendance.in = new Date(
      year,
      month,
      day,
      attendance.in.split(':')[0],
      attendance.in.split(':')[1],
    );

    attendance.out = new Date(
      year,
      month,
      day,
      attendance.out.split(':')[0],
      attendance.out.split(':')[1],
    );

    attendance = await new this.attendanceModel(attendance).save();

    const [school, branch, course, enrollment] = await Promise.all([
      this.schoolModel.findById(student.school),
      this.branchModel.findById(student.branch),
      this.courseModel.findById(attendance),
      this.enrollmentModel.findById(student.enrollment),
    ]);

    await Promise.all([
      school.updateOne({
        $push: { attendances: attendance._id.toString() },
      }),
      branch.updateOne({
        $push: { attendances: attendance._id.toString() },
      }),
      course.updateOne({
        $push: { attendances: attendance._id.toString() },
      }),
      student.updateOne({
        $push: { attendances: attendance._id.toString() },
      }),
      enrollment.updateOne({
        $push: { attendances: attendance._id.toString() },
      }),
    ]);
  }

  async clockIn(student, course) {
    await new this.attendanceModel({
      school: student.school,
      course,
      student: student._id,
      in: new Date(),
    }).save();
  }

  async clockOut(student, course) {
    return await this.attendanceModel.updateOne(
      {
        school: student.school,
        course,
        student: student._id,
        status: 'Open',
      },
      {
        status: 'Close',
        out: new Date(),
      },
    );
  }

  async updateAttendanceStatusById(attendanceId, status) {
    return await this.attendanceModel.findByIdAndUpdate(attendanceId, status);
  }

  async calculateTotalHours(student, course) {
    const result: any = await this.attendanceModel.find({
      school: student.school,
      course,
      student: student._id,
      status: 'Approved',
    });

    let total = 0;

    result.forEach((i) => {
      total = total + i.out.getHours() - i.in.getHours();
    });

    return `${total} Hour/s`;
  }

  async getAttendanceByFilter(filter: object) {
    Object.keys(filter).forEach(
      (key) => filter[key] === undefined && delete filter[key],
    );
    const result = await this.attendanceModel.find({ ...filter });
    return this.paginate(result);
  }

  async getAttendancesBySchoolId(school) {
    const result = await this.attendanceModel
      .find({ school: school._id })
      .populate('student')
      .populate('course')
      .populate('branch');
    return this.paginate(result);
  }

  async getAttendanceByCourseId(course: string) {
    const result = await this.attendanceModel.find({
      where: {
        course,
      },
    });
    return result;
  }

  async getAttendanceByStudentId(student: string) {
    const result = await this.attendanceModel.find({
      where: {
        student,
      },
    });
    return result;
  }

  async updateAttendanceById(id, attendance) {
    //
  }

  async searchAttendance(
    school,
    course = undefined,
    createdAt = undefined,
    keywords = undefined,
  ) {
    const attendance = await this.attendanceModel
      .find({
        where: {
          school,
          course,
        },
      })
      .populate('course')
      .populate('student')
      .populate('enrollment');

    const result = [];

    if (keywords) {
      keywords = keywords?.split(' ');
      attendance?.forEach((i) => {
        keywords?.forEach((word) => {
          if (JSON.stringify(i).toLowerCase().includes(word.toLowerCase())) {
            result.push(i);
          }
        });
      });
    }

    return result;
  }
}
