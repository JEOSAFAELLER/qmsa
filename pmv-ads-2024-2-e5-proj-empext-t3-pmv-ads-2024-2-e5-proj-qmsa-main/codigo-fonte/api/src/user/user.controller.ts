import {
  Body,
  Controller,
  Delete, // Adicionei Delete
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ICreateUser } from './dtos/createUserDto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async create(@Body() body: ICreateUser) {
    return await this.userService.create(body);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('profile/:id')
  async findOnde(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: ICreateUser) {
    return await this.userService.update(id, updateUserDto);
  }

  // Método para deletar usuário
 @UseGuards(AuthGuard)
  //@HttpCode(HttpStatus.NO_CONTENT) // Retorna 204 sem corpo
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
