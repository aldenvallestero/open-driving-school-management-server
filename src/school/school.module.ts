import { Module } from '@nestjs/common';
import SchoolService from './school.service';
import AuthService from '../auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { School, SchoolSchema } from './school.schema';
import { SchoolController } from './school.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: School.name, schema: SchoolSchema }]),
  ],
  controllers: [SchoolController],
  providers: [SchoolService, AuthService],
})
export class SchoolModule {}
