import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthGuard } from '@nestjs/passport';
import { Course } from 'generated/prisma';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  async create(
    @Request() req,
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<Course> {
    createCourseDto.teacherId = req.user.userId;
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
