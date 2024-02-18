import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { SchoolModule } from './school/school.module';

@Module({
  imports: [StudentModule, SchoolModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
