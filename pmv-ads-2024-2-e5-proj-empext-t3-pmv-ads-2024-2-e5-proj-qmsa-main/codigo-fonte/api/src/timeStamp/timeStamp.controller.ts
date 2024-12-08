import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Query,
  Response,
} from '@nestjs/common';
import { TimestampService } from './timeStamp.service';
import { ICreateTimeStampDto } from './dtos/ICreateTimeStampDto'; // Usar a nova interface
import { AuthGuard } from 'src/auth/guards/auth.guard';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { IReportDto } from './dtos/IReportDto';

@Controller('timestamps')
export class TimestampController {
  constructor(private readonly timestampService: TimestampService) {}

  @Get('report/generate-excel')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async generateReport(
    @Query() query: IReportDto,
    @Request() req: ExpressRequest,
    @Response() res: ExpressResponse,
  ) {
    const email = req['user'].email;
    const excelBuffer = await this.timestampService.generateExcelReport(
      query,
      email,
    );
    const dataGeracao = new Date();
    const dataFormatada = dataGeracao
      .toLocaleDateString('pt-BR')
      .replace(/\//g, '-');
    const horaFormatada = dataGeracao
      .toLocaleTimeString('pt-BR')
      .replace(/:/g, '-');
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    const nomeArquivo = `relatorio_horas_${dataFormatada}_${horaFormatada}.xlsx`;

    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${nomeArquivo}"`,
    );
    res.send(excelBuffer);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('report')
  async report(@Body() payload: IReportDto, @Request() req: ExpressRequest) {
    const email = req['user'].email;

    return await this.timestampService.report(payload, email);
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @Post('create')
  async create(
    @Body() payload: ICreateTimeStampDto,
    @Request() req: ExpressRequest,
  ) {
    payload.userEmail = req['user'].email;
    return await this.timestampService.create(payload);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req: ExpressRequest) {
    const email = req['user'].email;
    return await this.timestampService.findAll(email);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req: ExpressRequest) {
    const email = req['user'].email;
    return await this.timestampService.findOne(id, email);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Request() req: ExpressRequest,
    @Body() payload: Partial<ICreateTimeStampDto>,
  ) {
    try {
      payload.userEmail = req['user'].email;
      return await this.timestampService.update(id, payload);
    } catch (error) {
      throw new Error(`Falha em update:${error.message}`);
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req: ExpressRequest) {
    const email = req['user'].email;
    return await this.timestampService.delete(id, email);
  }
}
