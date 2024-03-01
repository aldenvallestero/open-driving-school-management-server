import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { HttpException } from '@nestjs/common';

@Injectable()
class AuthService {
  privateKey;
  publicKey;
  algorithm;

  constructor() {
    this.privateKey = fs.readFileSync('private.key', 'utf8');
    this.publicKey = fs.readFileSync('public.key', 'utf8');
    this.algorithm = { algorithm: 'RS256' };
  }

  generateToken(payload: object) {
    try {
      console.log(`AuthService.generateToken`);
      const token: string = jwt.sign(
        JSON.stringify(payload),
        this.privateKey,
        this.algorithm,
      );
      return token;
    } catch (error) {
      console.log(error);
      console.error(`AuthService.generateToken: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async verifyToken(token: string) {
    console.log(`AuthService.verifyToken: ${token}`);
    let payload;
    jwt.verify(token, this.publicKey, (error, decoded) => {
      if (error) {
        throw new HttpException('Unauthorized', 401);
      }
      payload = decoded;
    });
    return payload;
  }
}

export default AuthService;
