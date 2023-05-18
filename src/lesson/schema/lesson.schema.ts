import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Subject } from 'src/subject/schema/subject.schema';

@Schema({
  timestamps: true,
})
export class Lesson {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subjects',
  })
  subject: Subject;

  @Prop({ required: true })
  topic: string;

  @Prop({ required: true })
  context: string;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
