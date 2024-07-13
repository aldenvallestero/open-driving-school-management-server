import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import AuthService from '../auth/auth.service';
import { Note, NoteSchema } from './note.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteController } from './note.controller';
import { School, SchoolSchema } from '../school/school.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Note.name, schema: NoteSchema },
      { name: School.name, schema: SchoolSchema },
    ]),
  ],
  controllers: [NoteController],
  providers: [NoteService, AuthService],
})
export class NoteModule {}
