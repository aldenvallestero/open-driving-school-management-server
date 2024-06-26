import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnrollmentService } from './enrollment.service';
import { Enrollment, EnrollmentSchema } from './enrollment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Enrollment.name, schema: EnrollmentSchema },
    ]),
  ],
  controllers: [],
  providers: [EnrollmentService],
})
export class EnrollmentModule {}
