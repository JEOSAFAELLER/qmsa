import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreateUser } from './dtos/createUserDto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async create(data: ICreateUser) {
    return this.prisma.user.create({
      data: {
        name: data.nomeCompleto,
        email: data.email,
        password: data.password,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async update(id: string, updateUserDto: ICreateUser) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return this.prisma.user.update({
      where: { id },
      data: {
        name: updateUserDto.name || user.name,
        email: updateUserDto.email || user.email,
        password: updateUserDto.password || user.password,
      },
    });
  }

  // Método para deletar usuário
  async delete(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
