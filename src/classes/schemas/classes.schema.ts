import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Classes {
  @Prop({ required: true })
  name: string;
}

export const ClassesSchema = SchemaFactory.createForClass(Classes);
