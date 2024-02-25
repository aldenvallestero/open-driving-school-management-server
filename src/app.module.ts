import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { SchoolModule } from './school/school.module';
import { HealthController } from './health/health.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://aldenvallestero:vhcoxQ3ceCQtKIjL@serverlessinstance0.mywtw80.mongodb.net/dev-driving-school?retryWrites=true&w=majority&appName=ServerlessInstance0'),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    StudentModule,
    SchoolModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
