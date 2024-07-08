import { Model } from 'mongoose';
import { Vehicle } from './vehicle.schema';
import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { School } from '../school/school.schema';

@Injectable()
class VehicleService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<Vehicle>,
    @InjectModel(School.name) private schoolModel: Model<School>,
  ) {}

  async createVehicle(school, vehicle: any): Promise<any> {
    try {
      const result = await new this.vehicleModel({
        ...vehicle,
        school: school._id,
      }).save();

      new Promise(() => {
        this.schoolModel.findByIdAndUpdate(school._id, {
          $addToSet: { vehicles: result._id },
        });
      });

      return result;
    } catch (error) {
      console.error(`VehicleService.createVehicle: ${error}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }
}

export default VehicleService;
