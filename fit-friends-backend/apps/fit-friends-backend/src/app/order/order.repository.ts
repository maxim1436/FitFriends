import {CRUDRepository} from '@fit-friends-backend/core';
import {Order} from '@fit-friends-backend/shared-types';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import { OrderEntity } from './order.entity';
import { OrderModel } from './order.model';


@Injectable()
export class OrderRepository implements CRUDRepository<OrderEntity, string, Order> {
  constructor(
    @InjectModel(OrderModel.name) private readonly orderModel: Model<OrderModel>) {
  }

  public async create(item: OrderEntity): Promise<Order> {
    const newOrder = new this.orderModel(item);
    return (await newOrder.save()).populate(['service', 'coach', 'user']);
  }

  public async findById(id: string): Promise<Order> {
    return this.orderModel
      .findOne({_id: `${id}`})
      .populate(['service', 'coach', 'user'])
      .exec();
  }

  public async update(id: string, item: OrderEntity): Promise<Order> {
    return this.orderModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .populate(['service'])
      .exec();
  }

  public async destroy(id: string): Promise<void> {
    this.orderModel.deleteOne({_id: `${id}`});
  }

  public async findAllOrders(coachId: string): Promise<Order[]> {
    return this.orderModel
      .find({coach:{$in: [`${coachId}`]}})
      .populate(['service'])
      .exec();
  }
}
