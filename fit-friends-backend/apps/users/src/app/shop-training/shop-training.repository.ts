import {CRUDRepository} from '@fit-friends-backend/core';
import {ShopTrainingEntity} from './shop-training.entity';
import {Training} from '@fit-friends-backend/shared-types';
import {InjectModel} from '@nestjs/mongoose';
import {ShopTrainingModel} from './shop-training.model';
import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import { DEFAULT_TRAINING_COUNT } from './shop-training.constant';

@Injectable()
export class ShopTrainingRepository implements CRUDRepository<ShopTrainingEntity, string, Training> {
  constructor(
    @InjectModel(ShopTrainingModel.name) private readonly shopTrainingModel: Model<ShopTrainingModel>) {
  }

  public async create(item: ShopTrainingEntity): Promise<Training> {
    const newShopTraining = new this.shopTrainingModel(item);
    return newShopTraining.save();
  }

  public async findById(id: string): Promise<Training> {
    return this.shopTrainingModel
      .findOne({id})
      .exec();
  }

  public async update(id: string, item: ShopTrainingEntity): Promise<Training> {
    return this.shopTrainingModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }

  public async destroy(id: string): Promise<void> {
    this.shopTrainingModel.deleteOne({id});
  }

  public async findByFilters (filterData, count?: number): Promise<Training[]> {
    const { lowPrice, maxPrice, lowCalories, maxCalories, rating, time } = filterData

    for (let i = 0 ; i < time.length; i++) {
      if (time[i] === '80 мин — 100 мин' || time[i] === '100 мин — 120 мин') {

        if (time.includes('больше 80 мин')) {
          time.splice(i, 1);
        } else {
          time[i] = 'больше 80 мин';
        }
      }
    }

    if (count >= DEFAULT_TRAINING_COUNT) {
      const limit = DEFAULT_TRAINING_COUNT;
      return this.shopTrainingModel
      .find({
        price: {$gte: lowPrice, $lte: maxPrice},
        calories: {$gte: lowCalories, $lte: maxCalories},
        rating: {$in: rating},
        time: {$in: time}
      }, {}, {limit})
      .populate(['coachId'])
      .exec();
    } else {
      return this.shopTrainingModel
      .find({
        price: {$gte: lowPrice, $lte: maxPrice},
        calories: {$gte: lowCalories, $lte: maxCalories},
        rating: {$in: rating},
        time: {$in: time}
      }, {}, {count})
      .populate(['coachId'])
      .exec();
    }
  }

}
