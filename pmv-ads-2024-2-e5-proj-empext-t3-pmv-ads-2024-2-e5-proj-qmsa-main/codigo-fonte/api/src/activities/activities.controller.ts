import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { IActivitiesDtos } from './dtos/IActivitiesDto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Request as ExpressRequest } from 'express';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  @UseGuards(AuthGuard)
  async create(
    @Request() req: ExpressRequest,
    @Body() payload: IActivitiesDtos,
  ) {
    payload.userEmail = req['user'].email;
    return this.activitiesService.create(payload);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activitiesService.findOne(id);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Request() req: ExpressRequest) {
    const { email } = req['user'];
    return this.activitiesService.findAll(email);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Request() req: ExpressRequest,
    @Param('id') id: string,
    @Body() payload: Partial<IActivitiesDtos>,
  ) {
    payload.userEmail = req['user'].email;
    return await this.activitiesService.update(id, payload);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.activitiesService.delete(id);
  }
}
