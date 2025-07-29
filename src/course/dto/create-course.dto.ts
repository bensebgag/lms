import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  title: string;
  @IsString()
  @IsNotEmpty()
  @Length(10, 500)
  description: string;
  @IsNumber()
  price: number;
  @IsString()
  @IsNotEmpty()
  teacherId: string;
  @IsOptional()
  @IsString()
  categorieId?: string;
}
