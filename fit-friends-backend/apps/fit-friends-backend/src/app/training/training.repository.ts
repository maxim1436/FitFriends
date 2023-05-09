import {CRUDRepository} from '@fit-friends-backend/core';
import {TrainingEntity} from './training.entity';
import {Training} from '@fit-friends-backend/shared-types';
import {InjectModel} from '@nestjs/mongoose';
import {TrainingModel} from './training.model';
import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import { DEFAULT_TRAINING_COUNT } from './training.constant';

const TRAINING_TIME_80_100_MIN = '80 мин — 100 мин';
const TRAINING_TIME_100_120_MIN = '100 мин — 120 мин';
const TRAINING_TIME_MORE_80_MIN = 'больше 80 мин';

@Injectable()
export class TrainingRepository implements CRUDRepository<TrainingEntity, string, Training> {
  constructor(
    @InjectModel(TrainingModel.name) private readonly trainingModel: Model<TrainingModel>) {
  }

  public async create(item: TrainingEntity): Promise<Training> {
    const newTraining = new this.trainingModel(item);
    return (await newTraining.save()).populate(['coachId']);
  }

  public async findById(id: string): Promise<Training> {
    return this.trainingModel
      .findOne({_id: `${id}`})
      .populate(['coachId'])
      .exec();
  }

  public async update(id: string, item: TrainingEntity): Promise<Training> {
    return this.trainingModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .populate(['coachId'])
      .exec();
  }

  public async destroy(id: string): Promise<void> {
    this.trainingModel.deleteOne({_id: `${id}`});
  }

  public async findByDefault (count?: number): Promise<Training[]> {
    if (count >= DEFAULT_TRAINING_COUNT) {
      const limit = DEFAULT_TRAINING_COUNT;
      return this.trainingModel
      .find({}, {}, {limit})
      .exec();
    } else {
      const limit = count;
      return this.trainingModel
      .find({}, {}, {limit})
      .exec();
    }
  }

  public async findByFilters (id:string, filterData, count?: number): Promise<Training[]> {
    const { lowPrice, maxPrice, lowCalories, maxCalories, rating, time } = filterData
    for (let i = 0 ; i < time.length; i++) {
      if (time[i] === TRAINING_TIME_80_100_MIN || time[i] === TRAINING_TIME_100_120_MIN) {

        if (time.includes(TRAINING_TIME_MORE_80_MIN)) {
          time.splice(i, 1);
        } else {
          time[i] = TRAINING_TIME_MORE_80_MIN;
        }
      }
    }

    if (count >= DEFAULT_TRAINING_COUNT) {
      const limit = DEFAULT_TRAINING_COUNT;
      return this.trainingModel
      .find({
        coachId: `${id}`,
        price: {$gte: lowPrice, $lte: maxPrice},
        calories: {$gte: lowCalories, $lte: maxCalories},
        rating: {$in: rating},
        time: {$in: time}
      }, {}, {limit})
      .populate(['coachId'])
      .exec();
    } else {
      const limit = count;
      return this.trainingModel
      .find({
        coachId: `${id}`,
        price: {$gte: lowPrice, $lte: maxPrice},
        calories: {$gte: lowCalories, $lte: maxCalories},
        rating: {$in: rating},
        time: {$in: time}
      }, {}, {limit})
      .populate(['coachId'])
      .exec();
    }
  }

}
