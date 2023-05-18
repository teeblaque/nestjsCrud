import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Classes } from 'src/classes/schemas/classes.schema';

export class CreateSubjectDto {
  @IsNotEmpty()
  @IsString()
  readonly class: Classes;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string;
}
