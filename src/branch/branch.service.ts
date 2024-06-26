import { Model } from 'mongoose';
import { Branch } from './branch.schema';
import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { School } from 'src/school/school.schema';

@Injectable()
class BranchService {
  constructor(
    @InjectModel(Branch.name) private branchModel: Model<Branch>,
    @InjectModel(School.name) private schoolModel: Model<School>,
  ) {}

  async createBranch(school, branch: any): Promise<any> {
    try {
      const newBranch = await new this.branchModel({
        address: branch.newBranchAddress,
        contactPerson: branch.newBranchContactPerson,
        contactNumber: branch.newBranchContactNumber,
        school: school._id,
      }).save();
      await this.schoolModel.updateOne({
        $push: { branches: branch._id },
      });
      return newBranch;
    } catch (error) {
      console.error(`BranchService.createBranch: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async getAllBranchBySchoolId({ _id }): Promise<any> {
    try {
      const school: string = _id;
      const result = await this.branchModel.find({ school });
      return result;
    } catch (error) {
      console.error(`BranchService.createBranch: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async deleteBranch(school, branchId): Promise<void> {
    try {
      await Promise.all([
        this.branchModel.findByIdAndDelete(branchId),
        this.schoolModel.updateOne({
          $pull: { branches: branchId },
        }),
      ]);
    } catch (error) {
      console.error(`BranchService.deleteBranch: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async updateBranch(address, branchId: string) {
    try {
      const result = await this.branchModel.findByIdAndUpdate(
        branchId,
        {
          address,
        },
        { new: true },
      );

      return result;
    } catch (error) {
      console.error(`BranchService.updateBranch: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }
}

export default BranchService;
