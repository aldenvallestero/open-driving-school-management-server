import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { SchoolModule } from './school/school.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [StudentModule, SchoolModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
