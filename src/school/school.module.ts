import { Module } from '@nestjs/common';
import { SchoolController } from './school.controller';
import SchoolService from './school.service';
import { MongooseModule } from '@nestjs/mongoose';
import { School, SchoolSchema } from './school.schema';
import AuthService from 'src/auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: School.name, schema: SchoolSchema }]),
  ],
  controllers: [SchoolController],
  providers: [SchoolService, AuthService],
})
export class SchoolModule {}
