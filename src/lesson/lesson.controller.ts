import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { LessonService } from './lesson.service';
import { Lesson } from './schema/lesson.schema';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Controller('api/v1/lessons')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @Get()
  async getAllLessons(@Query() query: ExpressQuery): Promise<Lesson[]> {
    return this.lessonService.findAll(query);
  }

  @Post('store')
  async createSubject(
    @Body()
    subject: CreateLessonDto,
  ): Promise<Lesson> {
    return this.lessonService.create(subject);
  }

  @Get(':id')
  async getSingleSubject(
    @Param('id')
    id: string,
  ): Promise<Lesson> {
    return this.lessonService.findById(id);
  }

  @Patch('update/:id')
  async updateClass(
    @Param('id')
    id: string,
    @Body()
    subject: UpdateLessonDto,
  ): Promise<Lesson> {
    return this.lessonService.updateById(id, subject);
  }

  @Delete('delete/:id')
  async deleteClass(
    @Param('id')
    id: string,
  ): Promise<Lesson> {
    return this.lessonService.deleteById(id);
  }
}
