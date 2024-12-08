import { Injectable } from '@nestjs/common';
import { TimeStampRepository } from './timeStamp.repository';
import { ICreateTimeStampDto } from './dtos/ICreateTimeStampDto'; // Import da interface correta
import { IReportDto } from './dtos/IReportDto';
import { CompanyService } from 'src/company/company.service';
import { UserService } from 'src/user/user.service';
import * as ExcelJS from 'exceljs';

@Injectable()
export class TimestampService {
  constructor(
    private readonly timeStampRepository: TimeStampRepository,
    private readonly companyService: CompanyService,
    private readonly userServicer: UserService,
  ) {}

  async report(payload: IReportDto, email: string) {
    let totalHoras = 0;
    const timeStamp = await this.timeStampRepository.findManyHours(
      payload,
      email,
    );

    const cliente = payload.clientId
      ? await this.companyService.findOne(payload.clientId, email)
      : await this.companyService.findAll();
    const user = await this.userServicer.findByEmail(email);
    delete user.password;

    timeStamp.map((tarefa) => {
      const horas = this.calcularTempoGasto(tarefa.initHour, tarefa.endHour);
      totalHoras += horas;
    });

    let valorTotal = 0;

    if (Array.isArray(cliente)) {
      // Se cliente for um array, itere sobre todos os clientes
      cliente.forEach((c) => {
        if (c?.hour_value) {
          valorTotal += Number(c.hour_value) * totalHoras;
        }
      });
    } else {
      // Se for um único cliente, o cálculo é feito normalmente
      valorTotal = cliente?.hour_value
        ? Number(cliente.hour_value) * totalHoras
        : 0;
    }

    const horas = Math.floor(totalHoras);
    const minutos = Math.round((totalHoras - horas) * 60);
    const horasTotais = `${horas}h ${minutos}min`;

    return {
      user,
      cliente,
      timeStamp,
      valorTotal: valorTotal.toFixed(2),
      horasTotais: horasTotais,
    };
  }

  private calcularTempoGasto(initHour: Date, endHour: Date) {
    const tempoGastoEmMs = endHour.getTime() - initHour.getTime();
    const tempoGastoEmHoras = tempoGastoEmMs / (1000 * 60 * 60); // Em horas
    return tempoGastoEmHoras;
  }

  async create(data: Omit<ICreateTimeStampDto, 'createdAt'>) {
    const newTimeStamp: ICreateTimeStampDto = {
      ...data,
      createdAt: new Date(),
    };
    return await this.timeStampRepository.create(newTimeStamp);
  }

  // Listar todos os TimeStamps
  async findAll(email: string) {
    return await this.timeStampRepository.findAll(email);
  }

  // Encontrar um TimeStamp por ID
  async findOne(id: string, email: string) {
    return await this.timeStampRepository.findOne(id, email);
  }

  async update(id: string, data: Partial<ICreateTimeStampDto>) {
    return await this.timeStampRepository.update(id, data);
  }

  async delete(id: string, email: string) {
    return await this.timeStampRepository.delete(id, email);
  }

  async generateExcelReport(payload: IReportDto, email: string) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Relatório de Horas');

    // Definir as colunas do Excel com largura ajustada e alinhamento
    worksheet.columns = [
      {
        header: 'Data',
        key: 'data',
        width: 15,
        alignment: { horizontal: 'center' },
      },
      {
        header: 'Nome da Empresa',
        key: 'empresa',
        width: 25,
        alignment: { horizontal: 'center' },
      },
      {
        header: 'Atividade',
        key: 'atividade',
        width: 40,
        alignment: { horizontal: 'center' },
      },
      {
        header: 'Local',
        key: 'local',
        width: 20,
        alignment: { horizontal: 'center' },
      },
      {
        header: 'Total de Horas',
        key: 'totalHoras',
        width: 20,
        alignment: { horizontal: 'center' },
      },
      {
        header: 'Valor Total (R$)',
        key: 'valorTotal',
        width: 20,
        alignment: { horizontal: 'center' },
      },
      {
        header: 'Observações',
        key: 'observacoes',
        width: 40,
        alignment: { horizontal: 'center' },
      },
    ];

    // Adicionar cabeçalho com as informações do cliente e do usuário
    const { cliente, horasTotais, valorTotal, timeStamp, user } =
      await this.report(payload, email);

    // Título do Relatório
    worksheet.mergeCells('A1:G1');
    worksheet.getCell('A1').value =
      `Relatório de Horas - ${new Date().toLocaleDateString('pt-BR')}`;
    worksheet.getCell('A1').font = { bold: true, size: 14 };
    worksheet.getCell('A1').alignment = {
      horizontal: 'center',
      vertical: 'middle',
    };
    worksheet.getCell('A1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D9EAD3' },
    };

    // Adicionar informações do usuário
    worksheet.getCell('A2').value = `Nome: ${user.name}`;
    worksheet.getCell('A3').value =
      `Função: ${timeStamp[0]?.userFunction || 'Consultora'}`;

    // Alinhar e aplicar a quebra de linha
    worksheet.getCell('A2').alignment = {
      vertical: 'middle',
      horizontal: 'center',
      wrapText: true,
    };
    worksheet.getCell('A3').alignment = {
      vertical: 'middle',
      horizontal: 'center',
      wrapText: true,
    };

    worksheet.getColumn('A').width = 30;
    worksheet.getCell('A2').font = { size: 12 };
    worksheet.getCell('A3').font = { size: 12 };

    // Ajustar altura das linhas para acomodar a quebra de linha
    worksheet.getRow(2).height = 20;
    worksheet.getRow(3).height = 20;

    // Adicionar o detalhamento das atividades
    worksheet.addRow([]);
    worksheet.addRow([
      'Data',
      'Nome da Empresa',
      'Atividade',
      'Local',
      'Total de Horas',
      'Valor Total (R$)',
      'Observações',
    ]);

    // Adicionar as atividades de trabalho
    timeStamp.forEach((tarefa) => {
      const horas = this.calcularTempoGasto(tarefa.initHour, tarefa.endHour);

      let valorTotalTarefa = 0;

      // Se cliente for um array, soma o valor para todos os clientes
      if (Array.isArray(cliente)) {
        // Calcular o valor total para todos os clientes
        cliente.forEach((c) => {
          if (c?.hour_value) {
            valorTotalTarefa += Number(c.hour_value) * horas;
          }
        });
      } else {
        // Se for um único cliente, o valor é calculado normalmente
        if (cliente?.hour_value) {
          valorTotalTarefa = Number(cliente.hour_value) * horas;
        }
      }

      // Adicionar a linha para a tarefa, sem repetir o valor da hora base
      if (Array.isArray(cliente)) {
        cliente.forEach((c, index) => {
          // Mostrar o valor da hora base apenas para o primeiro cliente
          const valorHoraBase = index === 0 ? c.hour_value : null;
          worksheet.addRow([
            new Date(tarefa.date_time_stamp).toLocaleDateString('pt-BR'),
            c.company_name || 'N/A', // Corrigido para usar 'company_name'
            tarefa.activitiesDescription || 'N/A',
            tarefa.local || 'N/A',
            `${Math.floor(horas)}h ${Math.round((horas - Math.floor(horas)) * 60)}min`,
            valorTotalTarefa.toFixed(2), // Usa o valor total calculado para a tarefa
            tarefa.observations || 'N/A',
          ]);
        });
      } else {
        // Caso tenha apenas um cliente
        worksheet.addRow([
          new Date(tarefa.date_time_stamp).toLocaleDateString('pt-BR'),
          cliente.company_name || 'N/A', // Corrigido para usar 'company_name'
          tarefa.activitiesDescription || 'N/A',
          tarefa.local || 'N/A',
          `${Math.floor(horas)}h ${Math.round((horas - Math.floor(horas)) * 60)}min`,
          valorTotalTarefa.toFixed(2), // Usa o valor total calculado para a tarefa
          tarefa.observations || 'N/A',
        ]);
      }
    });

    // Adicionar os totais
    worksheet.addRow([]);
    worksheet.addRow(['Totais', '', '', '', horasTotais, valorTotal, '']);

    // Estilização para bordas e destaque dos totais
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        // Alinha as células ao centro
        cell.alignment = { vertical: 'middle', horizontal: 'center' };

        // Adiciona bordas para todas as células
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };

        // Negrito no cabeçalho
        if (rowNumber === 1) {
          cell.font = { bold: true };
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'D9EAD3' },
          }; // Cor de fundo suave no cabeçalho
        }

        // Destacar a linha de totais
        if (rowNumber === worksheet.lastRow.number) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'D0E0E6' },
          }; // Fundo claro para a linha Totais
          cell.font = { bold: true }; // Negrito para os totais
        }

        // Alinhamento para células de valor (números)
        if (colNumber === 4 || colNumber === 5 || colNumber === 6) {
          cell.alignment = { vertical: 'middle', horizontal: 'right' };
        }
      });
    });

    // Gerar o arquivo Excel e salvar em memória
    const buffer = await workbook.xlsx.writeBuffer();

    return buffer;
  }
}
