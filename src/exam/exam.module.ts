import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { Exam, ExamSchema } from './exam.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamController } from './exam.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Exam.name, schema: ExamSchema }]),
  ],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}
