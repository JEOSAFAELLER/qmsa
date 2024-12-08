export interface ICreateCompanyDto {
  cnpj: string;
  insc_est: string;
  company_name: string;
  zip_code: string;
  uf: string;
  city: string;
  district: string;
  street: string;
  company_number: string;
  hour_value: number;
  userEmail: string;
  createdAt: Date;
}
