import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Classes } from 'src/classes/schemas/classes.schema';

@Schema({
  timestamps: true,
})
export class Subject {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classes',
  })
  class: Classes;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
