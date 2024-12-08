import { BadRequestException, Injectable } from '@nestjs/common';
import { IActivitiesDtos } from './dtos/IActivitiesDto';
import { ActivitiesRepository } from './activities.repository';

@Injectable()
export class ActivitiesService {
  constructor(private readonly activitiesRepository: ActivitiesRepository) {}

  async create(activity: Omit<IActivitiesDtos, 'createdAt'>) {
    const newActivity: IActivitiesDtos = {
      ...activity,
      createdAt: new Date(), // Atribuindo a data atual automaticamente
    };

    return await this.activitiesRepository.create(newActivity);
  }
  async update(id: string, activity: Partial<IActivitiesDtos>) {
    try {
      return await this.activitiesRepository.update(id, activity);
    } catch (err) {
      throw new BadRequestException(
        'Já existe atividade cadastrada com esse nome' + err,
      );
    }
  }

  findOne(id: string) {
    return this.activitiesRepository.findOne(id);
  }

  findAll(email: string) {
    return this.activitiesRepository.findAll(email);
  }

  delete(id: string) {
    return this.activitiesRepository.delete(id);
  }
}
