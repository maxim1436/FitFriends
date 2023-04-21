import {CRUDRepository} from '@fit-friends-backend/core';
import { ShopAlertEntity } from './shop-alert.entity';
import {Alert} from '@fit-friends-backend/shared-types';
import {InjectModel} from '@nestjs/mongoose';
import { ShopAlertModel } from './shop-alert.model';
import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import { DEFAULT_ALERT_AMOUNT } from './shop-alert.constant';



@Injectable()
export class ShopAlertRepository implements CRUDRepository<ShopAlertEntity, string, Alert> {
  constructor(
    @InjectModel(ShopAlertModel.name) private readonly shopAlertModel: Model<ShopAlertModel>) {
  }

  public async create(item: ShopAlertEntity): Promise<Alert> {
    const newShopAlert = new this.shopAlertModel(item);
    return (await newShopAlert.save()).populate(['userId']);
  }

  public async findById(id: string): Promise<Alert> {
    return this.shopAlertModel
      .findOne({_id: `${id}`})
      .populate(['userId'])
      .exec();
  }

  public async update(id: string, item: ShopAlertEntity): Promise<Alert> {
    return this.shopAlertModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .populate(['userId'])
      .exec();
  }

  public async destroy(id: string): Promise<void> {
    this.shopAlertModel.deleteOne({_id: `${id}`});
  }

  public async findByDefault (userId: string, count?: number): Promise<Alert[]> {
    if (count >= DEFAULT_ALERT_AMOUNT) {
      const limit = DEFAULT_ALERT_AMOUNT;
      return this.shopAlertModel
      .find({userId: `${userId}`}, {}, {limit})
      .exec();
    } else {
      const limit = count;
      return this.shopAlertModel
      .find({userId: `${userId}`}, {}, {limit})
      .exec();
    }
  }

}
