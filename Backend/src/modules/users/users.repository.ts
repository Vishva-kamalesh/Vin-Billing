import { prisma } from '../../lib/prisma';
import { CreateUserDto, UpdateUserDto } from './users.dto';

export class UsersRepository {
  async create(data: CreateUserDto) {
    return prisma.user.create({ data });
  }

  async update(id: string, data: UpdateUserDto) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmailOrPhone(email: string, phone: string) {
    return prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });
  }

  async findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        is_active: true,
        avatar_url: true,
        created_at: true,
      }
    });
  }

  async deactivate(id: string) {
    return prisma.user.update({
      where: { id },
      data: { is_active: false },
    });
  }
}
