import { IsOptional, IsString } from 'class-validator';
import { Subject } from 'src/subject/schema/subject.schema';

export class UpdateLessonDto {
  @IsOptional()
  @IsString()
  readonly subject: Subject;

  @IsOptional()
  @IsString()
  readonly topic: string;

  @IsOptional()
  @IsString()
  readonly context: string;
}
