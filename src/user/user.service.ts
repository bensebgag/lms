import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly PrismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.PrismaService.user.create({ data: createUserDto });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return this.PrismaService.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return this.PrismaService.user.delete({ where: { id } });
  }
}
