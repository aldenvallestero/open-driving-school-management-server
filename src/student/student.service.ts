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

  private async findUserbyEmail(
    email: string,
  ): Promise<Prisma.StudentWhereUniqueInput> {
    const result = await this.prisma.student.findUnique({ where: { email } });
    return result;
  }

  async register(student): Promise<any> {
    try {
      console.log(`StudentService.register`);
      const newUser = await this.prisma.school.update({
        where: {
          id: '65d1841f3b85a527d12d9052',
        },
        data: {
          students: {
            create: student,
          },
        },
      });
      // const newUser = await this.prisma.school.update({
      //   where: {
      //     id: '65d17c093c311ce816a49095',
      //   },
      //   data: {
      //     student: {
      //       create: student,
      //     },
      //   },
      // });
      console.log(newUser);
      return newUser;
      // const token = this.login({ email, password });
      // return token;
    } catch (error) {
      console.log(error);
      console.error(`StudentService.register: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async login({ email, password }): Promise<string> {
    try {
      console.log(`StudentService.login`);

      // find user by email
      const user = await this.findUserbyEmail(email);

      if (!user) {
        throw new HttpException('User not found!', 404);
      }

      const token = this.generateToken({ email, password });
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
