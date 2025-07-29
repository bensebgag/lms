import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.userId;

    if (!userId) {
      throw new ForbiddenException(
        'No user ID found in JWT. Please authenticate with a valid token.',
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user)
      throw new ForbiddenException(`User with ID ${userId} not found .`);

    if (user.role !== 'teacher') {
      throw new ForbiddenException(
        'Access denied. Only users with the teacher role can perform this action.',
      );
    }

    return true;
  }
}
