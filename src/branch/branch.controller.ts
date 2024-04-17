import {
  Req,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common';

import { BranchGuard } from './branch.guard';
import BranchService from './branch.service';

@Controller('branch')
export class BranchController {
  constructor(private branchService: BranchService) {}

  @UseGuards(BranchGuard)
  @Post()
  async createBranch(@Req() { payload }, @Body() address) {
    return await this.branchService.createBranch(payload, address);
  }

  @UseGuards(BranchGuard)
  @Get()
  async getAllBranchBySchoolId(@Req() { payload }) {
    return await this.branchService.getAllBranchBySchoolId(payload);
  }

  @UseGuards(BranchGuard)
  @Delete(':branchId')
  async deleteBranch(@Req() { payload }, @Param('branchId') branchId: string) {
    return await this.branchService.deleteBranch(payload, branchId);
  }
}
