/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { Classes } from './schemas/classes.schema';
import { CreateClassDto } from './dto/create-classs.dto';
import { UpdateClassDto } from './dto/update-class.dto';

import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('api/v1/classes')
export class ClassesController {
  constructor(private classesService: ClassesService) {}

  @Get()
  async getAllClassess(@Query() query: ExpressQuery): Promise<Classes[]> {
    return this.classesService.findAll(query);
  }

  @Post('store')
  async createClass(
    @Body()
    classes: CreateClassDto,
  ): Promise<Classes> {
    return this.classesService.create(classes);
  }

  @Get(':id')
  async getSingleClass(
    @Param('id')
    id: string,
  ): Promise<Classes> {
    return this.classesService.findById(id);
  }

  @Put('update/:id')
  async updateClass(
    @Param('id')
    id: string,
    @Body()
    classes: UpdateClassDto,
  ): Promise<Classes> {
    return this.classesService.updateById(id, classes);
  }

  @Delete('delete/:id')
  async deleteClass(
    @Param('id')
    id: string,
  ): Promise<Classes> {
    return this.classesService.deleteById(id);
  }
}
