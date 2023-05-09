import {CRUDRepository} from '@fit-friends-backend/core';
import { AlertEntity } from './alert.entity';
import {Alert} from '@fit-friends-backend/shared-types';
import {InjectModel} from '@nestjs/mongoose';
import { AlertModel } from './alert.model';
import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import { DEFAULT_ALERT_AMOUNT } from './alert.constant';



@Injectable()
export class AlertRepository implements CRUDRepository<AlertEntity, string, Alert> {
  constructor(
    @InjectModel(AlertModel.name) private readonly alertModel: Model<AlertModel>) {
  }

  public async create(item: AlertEntity): Promise<Alert> {
    const newAlert = new this.alertModel(item);
    return (await newAlert.save()).populate(['userId']);
  }

  public async findById(id: string): Promise<Alert> {
    return this.alertModel
      .findOne({_id: `${id}`})
      .populate(['userId'])
      .exec();
  }

  public async update(id: string, item: AlertEntity): Promise<Alert> {
    return this.alertModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .populate(['userId'])
      .exec();
  }

  public async destroy(id: string): Promise<void> {
    await this.alertModel.deleteOne({_id: `${id}`});
  }

  public async findByDefault (userId: string, count?: number): Promise<Alert[]> {
    if (count >= DEFAULT_ALERT_AMOUNT) {
      const limit = DEFAULT_ALERT_AMOUNT;
      return this.alertModel
      .find({userId: `${userId}`}, {}, {limit})
      .exec();
    } else {
      const limit = count;
      return this.alertModel
      .find({userId: `${userId}`}, {}, {limit})
      .exec();
    }
  }

}
