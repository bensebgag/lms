import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.prismaService.course.findMany();
  }

  findOne(id: string) {
    return this.prismaService.course.findUnique({
      where: { id },
    });
  }

  async update(courseId: string, teacherId, updateCourseDto: UpdateCourseDto) {
    const course = await this.prismaService.course.findUnique({
      where: { id: courseId, teacherId: teacherId },
    });
    if (!course) {
      throw new NotFoundException(
        `Course with ID ${courseId} not found for teacher with ID ${teacherId}.`,
      );
    }
    return this.prismaService.course.update({
      where: { id: courseId, teacherId: teacherId },
      data: updateCourseDto,
    });
  }

  remove(courseId: string, teacherId: string) {
    const course = this.prismaService.course.findUnique({
      where: { id: courseId, teacherId: teacherId },
    });

    if (!course) {
      throw new NotFoundException(
        `Course with ID ${courseId} not found for teacher with ID ${teacherId}.`,
      );
    }

    return this.prismaService.course.delete({
      where: { id: courseId, teacherId: teacherId },
    });
  }
}
