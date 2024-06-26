import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { School } from './school.schema';
import { Model } from 'mongoose';
import AuthService from 'src/auth/auth.service';

@Injectable()
class SchoolService {
  constructor(
    @InjectModel(School.name) private schoolModel: Model<School>,
    private readonly authService: AuthService,
  ) {}

  async register(school): Promise<string> {
    try {
      school = await new this.schoolModel(school).save();
      const token: string = this.authService.generateToken(school);
      return token;
    } catch (error) {
      console.error(`SchoolService.register: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async login({ email, password }): Promise<string> {
    try {
      const school: School = await this.schoolModel
        .findOne({ email, password })
        .exec();

      if (!school) {
        throw new HttpException('School not found!', 401);
      }

      const token: string = this.authService.generateToken(school);
      return token;
    } catch (error) {
      console.error(`SchoolService.login: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async getSchool(payload): Promise<any> {
    try {
      const result = await this.schoolModel.findById(payload._id).exec();

      return result;
    } catch (error) {
      console.error(`SchoolService.getSchool: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async getSchoolById(school): Promise<any> {
    try {
      const result = await this.schoolModel
        .findById(school)
        .populate('courses')
        .populate('branches')
        .exec();
      return result;
    } catch (error) {
      console.error(`SchoolService.getSchoolById: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  validateToken(token: string) {}
}

export default SchoolService;
