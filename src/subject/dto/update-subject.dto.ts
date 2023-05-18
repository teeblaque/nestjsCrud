import { IsOptional, IsString } from 'class-validator';
import { Classes } from 'src/classes/schemas/classes.schema';

export class UpdateSubjectDto {
  @IsOptional()
  @IsString()
  readonly class: Classes;

  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string;
}
