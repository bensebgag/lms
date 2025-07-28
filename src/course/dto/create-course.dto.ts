export class CreateCourseDto {
  title: string;
  description: string;
  isPublished?: boolean;
  price?: number;
  teacherId: string;
  categorieId?: string;
}
