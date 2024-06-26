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

import BranchService from './branch.service';
import { BranchGuard } from './branch.guard';

@Controller('branch')
export class BranchController {
  constructor(private branchService: BranchService) {}

  @UseGuards(BranchGuard)
  @Post()
  async createBranch(@Req() { payload }, @Body() branch) {
    return await this.branchService.createBranch(payload, branch);
  }

  @UseGuards(BranchGuard)
  @Get()
  async getAllBranchBySchoolId(@Req() { payload }) {
    return await this.branchService.getAllBranchBySchoolId(payload);
  }

  @UseGuards(BranchGuard)
  @Put(':branchId')
  async updateBranch(@Body() { address }, @Param('branchId') branchId: string) {
    return await this.branchService.updateBranch(address, branchId);
  }

  @UseGuards(BranchGuard)
  @Delete(':branchId')
  async deleteBranch(@Req() { payload }, @Param('branchId') branchId: string) {
    return await this.branchService.deleteBranch(payload, branchId);
  }
}
