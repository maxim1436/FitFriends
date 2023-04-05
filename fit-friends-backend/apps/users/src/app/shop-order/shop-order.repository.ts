import {CRUDRepository} from '@fit-friends-backend/core';
import {Order} from '@fit-friends-backend/shared-types';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import { ShopOrderEntity } from './shop-order.entity';
import { ShopOrderModel } from './shop-order.model';


@Injectable()
export class ShopOrderRepository implements CRUDRepository<ShopOrderEntity, string, Order> {
  constructor(
    @InjectModel(ShopOrderModel.name) private readonly shopOrderModel: Model<ShopOrderModel>) {
  }

  public async create(item: ShopOrderEntity): Promise<Order> {
    const newShopOrder = new this.shopOrderModel(item);
    return (await newShopOrder.save()).populate(['service']);
  }

  public async findById(id: string): Promise<Order> {
    return this.shopOrderModel
      .findOne({_id: `${id}`})
      .exec();
  }

  public async update(id: string, item: ShopOrderEntity): Promise<Order> {
    return this.shopOrderModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .populate(['service'])
      .exec();
  }

  public async destroy(id: string): Promise<void> {
    this.shopOrderModel.deleteOne({id});
  }

  public async findAllOrders(coachId: string): Promise<Order[]> {
    return this.shopOrderModel
      .find({coach:{$in: [`${coachId}`]}})
      .populate(['service'])
      .exec();
  }
}
