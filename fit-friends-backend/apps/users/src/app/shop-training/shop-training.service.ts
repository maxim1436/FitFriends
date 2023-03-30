import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ShopTrainingRepository } from './shop-training.repository';
import { ShopTrainingEntity } from '../shop-training/shop-training.entity';
import { CreateTrainingDto } from './dto/create-training.dto';
import { TrainingMessage } from './shop-training.constant';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { FilterTrainingDto } from './dto/filter-training.dto';

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

  async getTraining(id: string) {
    return this.ShopTrainingRepository.findById(id);
  }

  async getSomeTrainings(dto: FilterTrainingDto, count?: number ) {

    const filterData = Object.assign({
        lowPrice: 0, maxPrice: 1000000,
        lowCalories: 1000, maxCalories: 5000, rating: [0, 1, 2, 3, 4, 5],
        time: ['10-30 мин', '30-50 мин', '50-80 мин', 'больше 80 мин']
      }, dto)

    return this.ShopTrainingRepository.findByFilters(filterData, count);
  }
}
