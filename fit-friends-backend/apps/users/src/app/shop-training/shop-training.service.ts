import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ShopTrainingRepository } from './shop-training.repository';
import { ShopTrainingEntity } from '../shop-training/shop-training.entity';
import { Training } from '@fit-friends-backend/shared-types';
import { CreateTrainingDto } from './dto/create-training.dto';
import { TrainingMessage } from './shop-training.constant';
import { UpdateTrainingDto } from './dto/update-training.dto';

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

  async update(id: string, dto: UpdateTrainingDto) {

    const existTraining = await this.ShopTrainingRepository.findById(id);

    if (!existTraining) {
      throw new UnauthorizedException(TrainingMessage.TRAINING_NOT_FOUND);
    }

    const shopTrainingEntity = Object.assign(new ShopTrainingEntity(existTraining), dto);

    return this.ShopTrainingRepository.update(id, shopTrainingEntity);
  }
}
