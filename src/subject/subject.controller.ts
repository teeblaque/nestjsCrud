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
import { SubjectService } from './subject.service';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { Subject } from './schema/subject.schema';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Controller('api/v1/subject')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  @Get()
  async getAllSubjects(@Query() query: ExpressQuery): Promise<Subject[]> {
    return this.subjectService.findAll(query);
  }

  @Post('store')
  async createSubject(
    @Body()
    subject: CreateSubjectDto,
  ): Promise<Subject> {
    return this.subjectService.create(subject);
  }

  @Get(':id')
  async getSingleSubject(
    @Param('id')
    id: string,
  ): Promise<Subject> {
    return this.subjectService.findById(id);
  }

  @Patch('update/:id')
  async updateClass(
    @Param('id')
    id: string,
    @Body()
    subject: UpdateSubjectDto,
  ): Promise<Subject> {
    return this.subjectService.updateById(id, subject);
  }

  @Delete('delete/:id')
  async deleteClass(
    @Param('id')
    id: string,
  ): Promise<Subject> {
    return this.subjectService.deleteById(id);
  }
}
