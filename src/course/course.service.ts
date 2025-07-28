import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(readonly prismaService: PrismaService) {}
  create(createCourseDto: CreateCourseDto) {
    return this.prismaService.course.create({
      data: {
        title: createCourseDto.title,
        description: createCourseDto.description,
        isPublished: createCourseDto.isPublished ?? false,
        price: createCourseDto.price ?? null,
        teacherId: createCourseDto.teacherId,
        categorieId: createCourseDto.categorieId,
      },
    });
  }

  findAll() {
    return `This action returns all course`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
