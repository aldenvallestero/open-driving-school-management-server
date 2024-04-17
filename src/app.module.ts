import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExamModule } from './exam/exam.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModule } from './course/course.module';
import { BranchModule } from './branch/branch.module';
import { SchoolModule } from './school/school.module';
import { StudentModule } from './student/student.module';
import { HealthController } from './health/health.controller';
import { AttendanceModule } from './attendance/attendance.module';
import { EnrollmentModule } from './enrollment/enrollment.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://aldenvallestero:vhcoxQ3ceCQtKIjL@serverlessinstance0.mywtw80.mongodb.net/dev-driving-school?retryWrites=true&w=majority&appName=ServerlessInstance0',
    ),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ExamModule,
    AuthModule,
    CourseModule,
    BranchModule,
    SchoolModule,
    StudentModule,
    AttendanceModule,
    EnrollmentModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
