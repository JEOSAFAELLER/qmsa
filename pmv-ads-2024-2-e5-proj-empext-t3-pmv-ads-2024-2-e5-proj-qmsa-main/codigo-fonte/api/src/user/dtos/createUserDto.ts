export interface ICreateUser {
  nomeCompleto: string; 
  name: string; // Garantir que a propriedade 'nomeCompleto' esteja definida
  email: string;
  password: string;
}
