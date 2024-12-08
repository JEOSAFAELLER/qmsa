import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ICreateUser } from './dtos/createUserDto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    return await this.userRepository.findAll();
  }

  async create(user: ICreateUser) {
    try {
      const emailExist = await this.findByEmail(user.email);
      if (emailExist) {
        throw new BadRequestException('Este email já foi cadastrado');
      }
      if (!this.validationPassword(user.password)) {
        throw new BadRequestException(
          'A senha deve conter no mínimo 8 caracteres, 1 letra maiúscula e 1 caractere numérico',
        );
      }
      const salt = await bcrypt.genSalt();
      const passwordEncrypted = await bcrypt.hash(user.password, salt);
      user.password = passwordEncrypted;

      const { password, ...result } = await this.userRepository.create(user);
      return result;
    } catch (err) {
      throw new BadRequestException(
        `Erro ao cadastrar o cliente: ${err.message}`,
      );
    }
  }

  async findOne(id: string) {
    return await this.userRepository.findOne(id);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  validationPassword(password: string) {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  }

  async update(id: string, updateUserDto: ICreateUser) {
    try {
      if (updateUserDto.password) {
        const salt = await bcrypt.genSalt();
        const passwordEncrypted = await bcrypt.hash(
          updateUserDto.password,
          salt,
        );
        updateUserDto.password = passwordEncrypted;
      }
      return await this.userRepository.update(id, updateUserDto);
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar usuário', error);
    }
  }

  // Método para deletar usuário
  async delete(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    await this.userRepository.delete(id);
  }
}
