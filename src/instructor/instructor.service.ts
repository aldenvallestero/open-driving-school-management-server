import { Model } from 'mongoose';
import { Instructor } from './instructor.schema';
import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { School } from '../school/school.schema';

@Injectable()
class InstructorService {
  constructor(
    @InjectModel(Instructor.name) private instructorModel: Model<Instructor>,
    @InjectModel(School.name) private schoolModel: Model<School>,
  ) {}

  async createInstructor(school, instructor: any): Promise<any> {
    try {
      const newInstructor = await new this.instructorModel({
        address: instructor.newInstructorAddress,
        contactPerson: instructor.newInstructorContactPerson,
        contactNumber: instructor.newInstructorContactNumber,
        school: school._id,
      }).save();
      await this.schoolModel.updateOne({
        $push: { instructors: instructor._id },
      });
      return newInstructor;
    } catch (error) {
      console.error(
        `InstructorService.createInstructor: ${JSON.stringify(error)}`,
      );
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async getAllInstructorBySchoolId({ _id }): Promise<any> {
    try {
      const school: string = _id;
      const result = await this.instructorModel.find({ school });
      return result;
    } catch (error) {
      console.error(
        `InstructorService.createInstructor: ${JSON.stringify(error)}`,
      );
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async getAllInstructorByBranchId({ _id }): Promise<any> {
    try {
      const school: string = _id;
      const result = await this.instructorModel.find({ school });
      return result;
    } catch (error) {
      console.error(
        `InstructorService.createInstructor: ${JSON.stringify(error)}`,
      );
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async getAllInstructorByCourseId({ _id }): Promise<any> {
    try {
      const school: string = _id;
      const result = await this.instructorModel.find({ school });
      return result;
    } catch (error) {
      console.error(
        `InstructorService.createInstructor: ${JSON.stringify(error)}`,
      );
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async getInstructorById(instructorId: string): Promise<any> {
    try {
      const result = await this.instructorModel.findById(instructorId).exec();
      return result;
    } catch (error) {
      console.error(
        `InstructorService.createInstructor: ${JSON.stringify(error)}`,
      );
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async deleteInstructor(school, instructorId): Promise<void> {
    try {
      await Promise.all([
        this.instructorModel.findByIdAndDelete(instructorId),
        this.schoolModel.updateOne({
          $pull: { instructors: instructorId },
        }),
      ]);
    } catch (error) {
      console.error(
        `InstructorService.deleteInstructor: ${JSON.stringify(error)}`,
      );
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async updateInstructor(address, instructorId: string) {
    try {
      const result = await this.instructorModel.findByIdAndUpdate(
        instructorId,
        {
          address,
        },
        { new: true },
      );

      return result;
    } catch (error) {
      console.error(
        `InstructorService.updateInstructor: ${JSON.stringify(error)}`,
      );
      throw new HttpException('Internal Server Error', 500);
    }
  }
}

export default InstructorService;
