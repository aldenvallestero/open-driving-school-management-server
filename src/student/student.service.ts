import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { HttpException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
class StudentService {
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

  private async getStudentByEmail(
    email: string,
  ): Promise<Prisma.StudentWhereUniqueInput> {
    const result = await this.prisma.student.findUnique({ where: { email } });
    return result;
  }

  async getStudentById(studentId: string) {
    try {
      console.log(`StudentService.getStudentById: ${studentId}`);

      const result = await this.prisma.student.findUnique({
        where: {
          id: studentId,
        },
      });

      if (!result) {
        throw new HttpException('Student not found!', 404);
      }

      return result;
    } catch (error) {
      console.error(`StudentService.getStudentById: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async updateStudentById(studentId, student) {
    try {
      console.log(`StudentService.updateStudentById: ${studentId}`);

      const result = await this.prisma.student.update({
        where: {
          id: studentId,
        },
        data: student,
      });

      if (!result) {
        throw new HttpException('Student not found!', 404);
      }

      return result;
    } catch (error) {
      console.error(
        `StudentService.updateStudentById: ${JSON.stringify(error)}`,
      );
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async register(schoolId, student): Promise<any> {
    try {
      console.log(`StudentService.register`);
      await this.prisma.school.update({
        where: {
          id: schoolId,
        },
        data: {
          students: {
            create: student,
          },
        },
      });

      const token = this.login({
        email: student.email,
        password: student.password,
      });
      return token;
    } catch (error) {
      console.log(error);
      console.error(`StudentService.register: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async login({ email, password }): Promise<string> {
    try {
      console.log(`StudentService.login`);

      const result = await this.getStudentByEmail(email);

      if (!result) {
        throw new HttpException('User not found!', 404);
      }

      const token = this.generateToken(result);
      return token;
    } catch (error) {
      console.error(`StudentService.login: ${JSON.stringify(error)}`);
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
      console.error(`StudentService.generateToken: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  validateToken(token: string) {
    console.log(`TokenService.validateToken: ${token}`);
  }
}

export default StudentService;
