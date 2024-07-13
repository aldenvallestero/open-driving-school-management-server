import { Model } from 'mongoose';
import { Note } from './note.schema';
import { InjectModel } from '@nestjs/mongoose';
import { School } from '../school/school.schema';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(Note.name) private noteModel: Model<Note>,
    @InjectModel(School.name) private schoolModel: Model<School>,
  ) {}

  async createNote(token, note): Promise<any> {
    try {
      const result = await new this.noteModel(note).save();

      // new Promise(() => {
      if (result.course) {
        await this.schoolModel.findByIdAndUpdate(note.course, {
          $addToSet: { notes: result.course },
        });
      }

      if (result.branch) {
        await this.schoolModel.findByIdAndUpdate(note.branch, {
          $addToSet: { notes: result.branch },
        });
      }

      if (result.school) {
        await this.schoolModel.findByIdAndUpdate(note.school, {
          $addToSet: { notes: result.school },
        });
      }
      // });

      return result;
    } catch (error) {
      console.error(`NoteService.createNote: ${JSON.stringify(error)}`);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async getAllNotesBySchoolId(payload) {
    try {
      const schoolId = payload?.school || payload._id;
      const { notes } = await this.schoolModel
        .findById(schoolId)
        .populate('notes')
        .exec();
      return notes;
    } catch (error) {
      throw new HttpException('Notes not found!', 404);
    }
  }
}
