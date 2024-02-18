import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { HttpException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
class SchoolService {
  privateKey;
  publicKey;
  algorithm;
  prisma: PrismaClient;

  constructor() {
    this.privateKey = fs.readFileSync('private.key', 'utf8');
    this.publicKey = fs.readFileSync('public.key', 'utf8');
    this.algorithm = { algorithm: 'RS256' };
    this.prisma = new PrismaClient();
  }

  private async findUserbyEmail(
    email: string,
  ): Promise<Prisma.SchoolWhereUniqueInput> {
    const result = await this.prisma.school.findUnique({ where: { email } });
    return result;
  }

  async register(school): Promise<any> {
    try {
      console.log(`SchoolService.register`);
      const newUser = await this.prisma.school.create({
        data: school,
      });
      console.log(newUser);
      return newUser;
      // const token = this.login({ email, password });
      // return token;
    } catch (error) {
      console.log(error);
      console.error(`SchoolService.register: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async login({ email, password }): Promise<string> {
    try {
      console.log(`SchoolService.login`);

      // find user by email
      const user = await this.findUserbyEmail(email);

      if (!user) {
        throw new HttpException('User not found!', 404);
      }

      const token = this.generateToken({ email, password });
      return token;
    } catch (error) {
      console.error(`SchoolService.login: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  private generateToken(payload: object) {
    try {
      console.log(`TokenService.generateToken: ${JSON.stringify(payload)}`);
      const token: string = jwt.sign(payload, this.privateKey, this.algorithm);
      return token;
    } catch (error) {
      console.log(error);
      console.error(`SchoolService.generateToken: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async getSchoolById(schoolId: string): Promise<any> {
    try {
      console.log(`SchoolService.getSchoolById: ${schoolId}`);

      const result = await this.prisma.school.findUnique({
        where: {
          id: schoolId,
        },
        include: {
          students: true,
        },
      });

      if (!result) {
        throw new HttpException('School not found!', 404);
      }

      return result;
    } catch (error) {
      console.error(`SchoolService.getSchoolById: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  validateToken(token: string) {
    console.log(`TokenService.validateToken: ${token}`);
  }
}

export default SchoolService;
