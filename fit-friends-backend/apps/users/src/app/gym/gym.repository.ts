import {CRUDRepository} from '@fit-friends-backend/core';
// import {ShopTrainingEntity} from './shop-training.entity';
import { GymEntity } from './gym.entity';
import {Gym} from '@fit-friends-backend/shared-types';
import {InjectModel} from '@nestjs/mongoose';
// import {ShopTrainingModel} from './shop-training.model';
import { GymModel } from './gym.model';
import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';

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

}
