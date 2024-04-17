/* eslint-disable prettier/prettier */
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

  async createBranch(school, address): Promise<any> {
    try {
      console.log(
        `BranchService.createBranch: ${JSON.stringify(school)} | ${address}`,
      );
      const branch = await new this.branchModel({
        ...address,
        school: school._id,
      }).save();
      await this.schoolModel.updateOne({
        $push: { branches: branch._id },
      });
      return branch;
    } catch (error) {
      console.error(`BranchService.createBranch: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async getAllBranchBySchoolId({ _id }): Promise<any> {
    try {
      console.log(
        `BranchService.getAllBranchBySchoolId: ${JSON.stringify(_id)}`,
      );
      const school: string = _id;
      const result = await this.branchModel.find({ school });
      return result;
    } catch (error) {
      console.error(`BranchService.createBranch: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async deleteBranch(school, branch): Promise<void> {
    try {
      console.log(
        `BranchService.deleteBranch: ${JSON.stringify({ school, branch })}`,
      );
      await this.branchModel.findByIdAndDelete(branch);
      await this.schoolModel.updateOne({
        $pull: { branches: branch },
      });
    } catch (error) {
      console.error(`BranchService.deleteBranch: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }
}

export default BranchService;
