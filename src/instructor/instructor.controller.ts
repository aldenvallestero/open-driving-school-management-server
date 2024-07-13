import {
  Put,
  Req,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common';

import InstructorService from './instructor.service';
import { InstructorGuard } from './instructor.guard';

@Controller('instructor')
export class InstructorController {
  constructor(private instructorService: InstructorService) {}

  @UseGuards(InstructorGuard)
  @Post()
  async createInstructor(@Req() { payload }, @Body() instructor) {
    return await this.instructorService.createInstructor(payload, instructor);
  }

  @UseGuards(InstructorGuard)
  @Get()
  async getAllInstructorBySchoolId(@Req() { payload }) {
    return await this.instructorService.getAllInstructorBySchoolId(payload);
  }

  @UseGuards(InstructorGuard)
  @Get(':instructorId')
  async getInstructorById(@Param('instructorId') instructorId: string) {
    return await this.instructorService.getInstructorById(instructorId);
  }

  @UseGuards(InstructorGuard)
  @Put(':instructorId')
  async updateInstructor(
    @Body() { address },
    @Param('instructorId') instructorId: string,
  ) {
    return await this.instructorService.updateInstructor(address, instructorId);
  }

  @UseGuards(InstructorGuard)
  @Delete(':instructorId')
  async deleteInstructor(
    @Req() { payload },
    @Param('instructorId') instructorId: string,
  ) {
    return await this.instructorService.deleteInstructor(payload, instructorId);
  }
}
