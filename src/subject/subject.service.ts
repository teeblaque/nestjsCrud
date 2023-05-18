import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { Subject } from './schema/subject.schema';
import { InjectModel } from '@nestjs/mongoose';

import { Query } from 'express-serve-static-core';
import { Classes } from 'src/classes/schemas/classes.schema';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel(Subject.name)
    private subjectModel: mongoose.Model<Subject>,
  ) {}

  async findAll(query: Query): Promise<Subject[]> {
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
    const subject = await this.subjectModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip)
      .populate('class', 'name', Classes.name);
    return subject;
  }

  async create(subject: Subject): Promise<Subject> {
    const res = await this.subjectModel.create(subject);
    return res;
  }

  async findById(id: string): Promise<Subject> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter correct id');
    }
    const subject = await this.subjectModel
      .findById(id)
      .populate('class', 'name', Classes.name);
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }
    return subject;
  }

  async updateById(id: string, subject: Subject): Promise<Subject> {
    return await this.subjectModel.findByIdAndUpdate(id, subject, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Subject> {
    return await this.subjectModel.findByIdAndDelete(id);
  }
}
