import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { SchoolModule } from './school/school.module';
import { HealthController } from './health/health.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    StudentModule,
    SchoolModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
