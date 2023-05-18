/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Classes } from './schemas/classes.schema';
import mongoose from 'mongoose';

import { Query } from 'express-serve-static-core';

@Injectable()
export class ClassesService {
    constructor(
        @InjectModel(Classes.name)
        private classesModel: mongoose.Model<Classes>
    ){}

    async findAll(query: Query): Promise<Classes[]>{
        const resPerPage = 2;
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        const keyword = query.keyword ? {
            name: {
                $regex: query.keyword,
                $options: 'i'
            }
        } :  {}
        const classes = await this.classesModel.find({ ...keyword}).limit(resPerPage).skip(skip);
        return classes;
    }

    async create(classes: Classes): Promise<Classes> {
        const res = await this.classesModel.create(classes);
        return res;
    }

    async findById(id: string): Promise<Classes> {

        const isValidId = mongoose.isValidObjectId(id);
        if (!isValidId) {
            throw new BadRequestException('Please enter correct id');
        }
        const singleClass = await this.classesModel.findById(id);
        if (!singleClass) {
            throw new NotFoundException('Class not found');
        }
        return singleClass;
    }

    async updateById(id: string, classData: Classes): Promise<Classes> {
        return await this.classesModel.findByIdAndUpdate(id, classData, {
            new: true,
            runValidators: true
        });
    }

    async deleteById(id: string): Promise<Classes> {
        return await this.classesModel.findByIdAndDelete(id);
    }
}
