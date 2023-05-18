import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Query } from 'express-serve-static-core';
import { Lesson } from './schema/lesson.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Subject } from 'src/subject/schema/subject.schema';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson.name)
    private lessonModel: mongoose.Model<Lesson>,
  ) {}

  async findAll(query: Query): Promise<Lesson[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    const keyword = query.keyword
      ? {
          name: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    const lesson = await this.lessonModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip)
      .populate('subject', 'name', Subject.name);
    return lesson;
  }

  async create(lesson: Lesson): Promise<Lesson> {
    const res = await this.lessonModel.create(lesson);
    return res;
  }

  async findById(id: string): Promise<Lesson> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter correct id');
    }
    const lesson = await this.lessonModel
      .findById(id)
      .populate('subject', 'name', Subject.name);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    return lesson;
  }

  async updateById(id: string, lesson: Lesson): Promise<Lesson> {
    return await this.lessonModel.findByIdAndUpdate(id, lesson, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Lesson> {
    return await this.lessonModel.findByIdAndDelete(id);
  }
}
