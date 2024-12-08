import { BadRequestException, Injectable } from '@nestjs/common';
import { ICreateCompanyDto } from './dtos/ICreateCompanyDto';
import { CompanyRepository } from './company.repository';
import { IFilterDto } from './dtos/IFilterDto';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async delete(id: string, email: string) {
    return await this.companyRepository.delete(id, email);
  }

  async update(payload: ICreateCompanyDto, id: string) {
    return await this.companyRepository.update(payload, id);
  }

  async find(query: IFilterDto) {
    return this.companyRepository.find(query);
  }

  async findOne(id: string, email: string) {
    return this.companyRepository.findOne(id, email);
  }

  async create(payload: ICreateCompanyDto) {
    const { cnpj, company_name } = payload;
    this.validationCnpj(cnpj);
    await this.checkIfExists('cnpj', cnpj, 'CNPJ já cadastrado!');
    await this.checkIfExists(
      'company_name',
      company_name,
      'Nome de empresa já cadastrado!',
    );
    return await this.companyRepository.create(payload);
  }

  async findAll() {
    return await this.companyRepository.findAll();
  }

  private validationCnpj(cnpj: string) {
    const regex = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/;
    if (!regex.test(cnpj)) {
      throw new BadRequestException('O CNPJ informado é invalido!');
    }
    return;
  }

  private async checkIfExists(
    field: string,
    value: string,
    errorMessage: string,
  ): Promise<void> {
    const entityExists = await this.companyRepository.findFirst({
      [field]: value,
    });
    if (entityExists) {
      throw new BadRequestException(errorMessage);
    }
  }
}
