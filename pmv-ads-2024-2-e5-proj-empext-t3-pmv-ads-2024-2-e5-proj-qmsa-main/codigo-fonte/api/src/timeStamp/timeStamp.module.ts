import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Serviço do Prisma para conectar ao DB
import { TimestampService } from './timeStamp.service'; // Serviço para a lógica de negócio
import { TimestampController } from './timeStamp.controller'; // Controlador para rotas HTTP
import { TimeStampRepository } from './timeStamp.repository';
import { JwtService } from '@nestjs/jwt';
import { CompanyService } from 'src/company/company.service';
import { CompanyRepository } from 'src/company/company.repository';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [],
  controllers: [TimestampController], // O controlador que lida com as requisições HTTP
  providers: [
    TimestampService,
    PrismaService,
    TimeStampRepository,
    JwtService,
    CompanyService,
    CompanyRepository,
    UserService,
    UserRepository,
  ], // O serviço de negócios e o Prisma Service
})
export class TimestampModule {}
