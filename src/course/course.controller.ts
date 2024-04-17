import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateDto } from './dto/create.dto';
import { CourseGuard } from './course.guard';

@Controller('course')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
  }),
)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(CourseGuard)
  @Post()
  async create(@Req() { payload }, @Body() createDto: CreateDto) {
    return await this.courseService.createCourse({
      ...createDto,
      school: payload,
    });
  }

  @UseGuards(CourseGuard)
  @Get('/')
  async getAllCoursesBySchoolId(@Req() { payload }) {
    return await this.courseService.getAllCoursesBySchoolId(payload);
  }

  @Get(':id')
  async getCourseById(@Param('id') id: string) {
    return await this.courseService.getCourseById(id);
  }
}
