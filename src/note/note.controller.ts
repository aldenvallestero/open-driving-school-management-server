import { Req, Get, Post, Body, UseGuards, Controller } from '@nestjs/common';

import { NoteGuard } from './note.guard';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @UseGuards(NoteGuard)
  @Post()
  async createNote(@Req() { payload }, @Body() note) {
    return await this.noteService.createNote(payload, note);
  }

  @UseGuards(NoteGuard)
  @Get()
  async getAllNotesBySchoolId(@Req() { payload }) {
    return await this.noteService.getAllNotesBySchoolId(payload);
  }
}
