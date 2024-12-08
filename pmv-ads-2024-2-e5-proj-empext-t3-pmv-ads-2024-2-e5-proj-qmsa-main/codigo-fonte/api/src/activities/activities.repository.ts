import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IActivitiesDtos } from './dtos/IActivitiesDto';

@Injectable()
export class ActivitiesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: IActivitiesDtos) {
    return await this.prisma.activities.create({
      data,
    });
  }

  async update(id: string, data: Partial<IActivitiesDtos>) {
    return await this.prisma.activities.update({
      where: {
        id,

        userEmail: data.userEmail,
      },
      data: {
        description: data.description,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.activities.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(email: string) {
    return this.prisma.activities.findMany({
      where: {
        userEmail: email,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.activities.delete({
      where: {
        id,
      },
    });
  }
}
