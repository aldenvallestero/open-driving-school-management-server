import { Req, Post, Body, UseGuards, Controller } from '@nestjs/common';

import VehicleService from './vehicle.service';
import { VehicleGuard } from './vehicle.guard';

@Controller('vehicle')
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  @UseGuards(VehicleGuard)
  @Post()
  async createVehicle(@Req() { payload }, @Body() vehicle) {
    return await this.vehicleService.createVehicle(payload, vehicle);
  }
}
