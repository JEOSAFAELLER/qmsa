export interface ICreateTimeStampDto {
  clientId: string;
  userEmail: string; // ID do usuário relacionado
  date_time_stamp: Date;
  companyName: string; // ID do cliente relacionado
  initHour: string;
  endHour: string;
  local: string;
  project: string;
  activitiesDescription: string; // ID da atividade relacionada
  userFunction: string;
  observations: string;
  hours_worked: string;
  createdAt: Date;
}
