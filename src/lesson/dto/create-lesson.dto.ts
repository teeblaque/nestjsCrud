import { IsNotEmpty, IsString } from 'class-validator';
import { Subject } from 'src/subject/schema/subject.schema';

export class CreateLessonDto {
  @IsNotEmpty()
  @IsString()
  readonly subject: Subject;

  @IsNotEmpty()
  @IsString()
  readonly topic: string;

  @IsNotEmpty()
  @IsString()
  readonly context: string;
}
