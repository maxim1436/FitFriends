import {CRUDRepository} from '@fit-friends-backend/core';
import { GymEntity } from './gym.entity';
import {Gym} from '@fit-friends-backend/shared-types';
import {InjectModel} from '@nestjs/mongoose';
import { GymModel } from './gym.model';
import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import { DEFAULT_GYM_COUNT } from './gym.constant';

@Injectable()
export class GymRepository implements CRUDRepository<GymEntity, string, Gym> {
  constructor(
    @InjectModel(GymModel.name) private readonly gymModel: Model<GymModel>) {
  }

  public async create(item: GymEntity): Promise<Gym> {
    const newGym = new this.gymModel(item);
    return (await newGym.save());
  }

  public async findById(id: string): Promise<Gym> {
    return this.gymModel
      .findOne({_id: `${id}`})
      .exec();
  }

  public async update(id: string, item: GymEntity): Promise<Gym> {
    return this.gymModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }

  public async destroy(id: string): Promise<void> {
    this.gymModel.deleteOne({_id: `${id}`});
  }

  public async findFavoriteGyms(gymIdArray: string[]): Promise<Gym[]> {
    return this.gymModel
      .find({_id:{$in: gymIdArray}})
      .exec();
  }

  public async findByDefault (count?: number): Promise<Gym[]> {
    if (count >= DEFAULT_GYM_COUNT) {
      const limit = DEFAULT_GYM_COUNT;
      return this.gymModel
      .find({}, {}, {limit})
      .exec();
    } else {
      const limit = count;
      return this.gymModel
      .find({}, {}, {limit})
      .exec();
    }
  }

}
