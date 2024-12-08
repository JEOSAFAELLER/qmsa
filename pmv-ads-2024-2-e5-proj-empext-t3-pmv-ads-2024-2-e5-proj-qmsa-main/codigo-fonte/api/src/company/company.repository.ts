import { Injectable } from '@nestjs/common';
import { ICreateCompanyDto } from './dtos/ICreateCompanyDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { IFilterDto } from './dtos/IFilterDto';

@Injectable()
export class CompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.client.findMany();
  }

  async delete(id: string, email: string) {
    return await this.prisma.client.delete({
      where: {
        id,
        userEmail: email,
      },
    });
  }

  async update(payload: ICreateCompanyDto, id: string) {
    return await this.prisma.client.update({
      where: {
        id,
        userEmail: payload.userEmail,
      },
      data: payload,
    });
  }

  async findFirst(query) {
    return await this.prisma.client.findFirst({
      where: {
        cnpj: query.cnpj,
        company_name: query.company_name,
      },
    });
  }

  async find(query: IFilterDto) {
    return await this.prisma.client.findMany({
      where: {
        cnpj: { contains: query.cnpj },
        company_name: { contains: query.company_name },
      },
    });
  }
  async findOne(id: string, email: string) {
    return await this.prisma.client.findUnique({
      where: {
        id,
        userEmail: email,
      },
    });
  }

  async create(data: ICreateCompanyDto) {
    return await this.prisma.client.create({
      data,
    });
  }
}
