import { Module } from '@nestjs/common';
import BranchService from './branch.service';
import AuthService from '../auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BranchController } from './branch.controller';
import { Branch, BranchSchema } from './branch.schema';
import { School, SchoolSchema } from '../school/school.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Branch.name, schema: BranchSchema },
      { name: School.name, schema: SchoolSchema },
    ]),
  ],
  providers: [BranchService, AuthService],
  controllers: [BranchController],
})
export class BranchModule {}
