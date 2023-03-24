import {CRUDRepository} from '@fit-friends-backend/core';
import {ShopTrainingEntity} from './shop-training.entity';
import {Training} from '@fit-friends-backend/shared-types';
import {InjectModel} from '@nestjs/mongoose';
import {ShopTrainingModel} from './shop-training.model';
import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';

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

}
