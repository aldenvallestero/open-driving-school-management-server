import { Module } from '@nestjs/common';
import VehicleService from './vehicle.service';
import AuthService from '../auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleController } from './vehicle.controller';
import { Vehicle, VehicleSchema } from './vehicle.schema';
import { School, SchoolSchema } from '../school/school.schema';
import { Branch, BranchSchema } from '../branch/branch.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: School.name, schema: SchoolSchema },
      { name: Branch.name, schema: BranchSchema },
      { name: Vehicle.name, schema: VehicleSchema },
    ]),
  ],
  providers: [VehicleService, AuthService],
  controllers: [VehicleController],
})
export class VehicleModule {}
