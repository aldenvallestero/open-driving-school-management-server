import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import AuthService from '../auth/auth.service';
import { CourseService } from './course.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseController } from './course.controller';
import { Course, CourseSchema } from './course.schema';
import { CourseMiddleware } from './course.middleware';
import { School, SchoolSchema } from '../school/school.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: School.name, schema: SchoolSchema },
    ]),
  ],
  providers: [CourseService, AuthService],
  controllers: [CourseController],
})
export class CourseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CourseMiddleware)
      .forRoutes({ path: 'course', method: RequestMethod.POST });
  }
}
