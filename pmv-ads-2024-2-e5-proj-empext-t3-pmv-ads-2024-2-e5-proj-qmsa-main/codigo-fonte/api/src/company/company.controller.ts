import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ICreateCompanyDto } from './dtos/ICreateCompanyDto';
import { Request as ExpressRequest } from 'express';
import { IFilterDto } from './dtos/IFilterDto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async create(
    @Request() req: ExpressRequest,
    @Body() payload: ICreateCompanyDto,
  ) {
    payload.userEmail = req['user'].email;
    return await this.companyService.create(payload);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  @UseGuards(AuthGuard)
  async find(@Query() query?: IFilterDto) {
    return await this.companyService.find(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async findById(@Param('id') id: string, @Request() req: ExpressRequest) {
    const email = req['user'].email;
    return await this.companyService.findOne(id, email);
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Request() req: ExpressRequest,
    @Body() payload: ICreateCompanyDto,
  ) {
    payload.userEmail = req['user'].email;
    return await this.companyService.update(payload, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string, @Request() req: ExpressRequest) {
    const email = req['user'].email;
    return await this.companyService.delete(id, email);
  }
}
