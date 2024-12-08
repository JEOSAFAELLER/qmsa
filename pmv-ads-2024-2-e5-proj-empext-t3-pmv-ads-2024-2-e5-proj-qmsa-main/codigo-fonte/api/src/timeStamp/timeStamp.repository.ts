import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreateTimeStampDto } from './dtos/ICreateTimeStampDto';
import { IReportDto } from './dtos/IReportDto';

@Injectable()
export class TimeStampRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findManyHours(payload: IReportDto, email: string) {
    return await this.prisma.timeStamp.findMany({
      where: {
        userEmail: email,
        ...(payload.clientId ? { clientId: payload.clientId } : {}),
        date_time_stamp: {
          gte: payload.initDate,
          lte: payload.endDate,
        },
      },
    });
  }

  async create(data: ICreateTimeStampDto) {
    if (!data.clientId) {
      throw new Error('Client ID is required');
    }
    const client = await this.prisma.client.findUnique({
      where: { id: data.clientId },
      select: { company_name: true, id: true },
    });

    const activities = await this.prisma.activities.findUnique({
      where: { description: data.activitiesDescription },
      select: { description: true },
    });

    if (!client) {
      throw new Error('Client not found');
    }

    try {
      const timeStamp = await this.prisma.timeStamp.create({
        data: {
          clientId: client.id,
          userEmail: data.userEmail,
          date_time_stamp: data.date_time_stamp, // Preservando o valor que vem do cliente
          initHour: data.initHour,
          endHour: data.endHour,
          local: data.local,
          project: data.project,
          userFunction: data.userFunction,
          observations: data.observations,
          hours_worked: data.hours_worked,
          activitiesDescription: activities.description,
          companyName: client.company_name,
          createdAt: new Date(),
        },
      });

      return timeStamp;
    } catch (error) {
      throw new Error(`Erro ao criar o timestamp: ${error.message}`);
    }
  }

  async findAll(email: string) {
    return await this.prisma.timeStamp.findMany({
      where: { userEmail: email },
    });
  }

  async findOne(id: string, email: string) {
    return await this.prisma.timeStamp.findUnique({
      where: { id, userEmail: email },
    });
  }

  async update(id: string, data: Partial<ICreateTimeStampDto>) {
    const dateString = data.date_time_stamp.toString(); // Exemplo: "2024-11-24T00:00:00.000Z"
    const [datePart] = dateString.split('T');
    const initHour = new Date(`${datePart}T${data.initHour}:00.000Z`);
    const endHour = new Date(`${datePart}T${data.endHour}:00.000Z`);
    const client = await this.prisma.client.findUnique({
      where: { id: data.clientId },
      select: { company_name: true, id: true },
    });

    const activities = await this.prisma.activities.findUnique({
      where: { description: data.activitiesDescription },
      select: { description: true },
    });

    return this.prisma.timeStamp.update({
      where: { id, userEmail: data.userEmail },
      data: {
        clientId: client.id,
        userEmail: data.userEmail,
        date_time_stamp: data.date_time_stamp,
        initHour: initHour,
        endHour: endHour,
        local: data.local,
        project: data.project,
        userFunction: data.userFunction,
        observations: data.observations,
        hours_worked: data.hours_worked,
        activitiesDescription: activities.description,
        companyName: client.company_name,
        createdAt: new Date(),
      },
    });
  }

  // Deletar um TimeStamp
  async delete(id: string, email: string) {
    return await this.prisma.timeStamp.delete({
      where: { id, userEmail: email },
    });
  }
}
