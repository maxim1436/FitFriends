import { Injectable } from '@nestjs/common';
import { ShopTrainingRepository } from './shop-training.repository';
import { ShopTrainingEntity } from '../shop-training/shop-training.entity';
import { Training } from '@fit-friends-backend/shared-types';
import { CreateTrainingDto } from './dto/create-training.dto';

@Injectable()
export class ShopTrainingService {
  constructor(
    private readonly ShopTrainingRepository: ShopTrainingRepository,
  ) {}

  async create(dto: CreateTrainingDto, id: string) {
    const {title, avatar, level, type, time,
    price, calories, description, gender,
    videoLink, rating, special} = dto;

    const shopTraining = {
      title, avatar, level, type, time,
      price, calories, description, gender,
      videoLink, rating, special, coach: id
    };

    const trainingEntity = await new ShopTrainingEntity(shopTraining);

      const createdTraining = await this.ShopTrainingRepository
      .create(trainingEntity);

      return createdTraining;
  }
}
