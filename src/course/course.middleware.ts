import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import AuthService from '../auth/auth.service';
import { School } from '../school/school.schema';

@Injectable()
export class CourseMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
    @InjectModel(School.name) private schoolModel: Model<School>,
  ) {}

  private async rejectExceedingCourseCount(schoolId) {
    const { courses } = await this.schoolModel
      .findById(schoolId)
      .populate('courses');

    if (courses?.length > 5) {
      throw new BadRequestException('Too much courses were created!');
    }
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token: string = authorization.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Unauthorized!');
    }

    const { _id } = await this.authService.verifyToken(token);
    await this.rejectExceedingCourseCount(_id);
    next();
  }
}
