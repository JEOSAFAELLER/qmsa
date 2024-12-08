import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActivitiesRepository } from './activities.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ActivitiesController],
  providers: [
    ActivitiesService,
    PrismaService,
    ActivitiesRepository,
    JwtService,
  ],
})
export class ActivitiesModule {}
