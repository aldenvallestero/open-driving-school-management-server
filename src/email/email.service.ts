import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  transporter: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'aldenvallestero.official@gmail.com',
        pass: 'eddoxhpedcfifire',
      },
    });
  }

  send(from: string, to: string, subject: string, text: string): void {
    try {
      new Promise(() => {
        this.transporter.sendMail({
          from,
          to,
          subject,
          text,
        });
      });
    } catch (error) {
      console.error(`EmailService.sendEmail: ${error}`);
      return;
    }
  }
}
