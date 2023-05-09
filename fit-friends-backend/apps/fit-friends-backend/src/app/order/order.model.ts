import { Document } from 'mongoose';
import { Order, OrderType } from '@fit-friends-backend/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { TrainingModel } from '../training/training.model';
import { UserModel } from '../user/user.model';

@Schema({
  collection: 'orders',
})
export class OrderModel extends Document implements Order {

  @Prop({
    required: true,
    type: String,
    enum: OrderType,
  })
  public orderType: OrderType;

  @Prop({
    required: true,
    default: 0,
  })
  public price: number;

  @Prop({
    required: true,
    min: [1, 'Min amount can be 1'],
    max: [50, 'Max amount can be 50'],
  })
  public amount: number;

  @Prop({
    required: true,
  })
  public totalPrice: number;

  @Prop({
    required: true,
  })
  public paymentType: string;

  @Prop({
    required: true,
  })
  public dateBirth: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId, ref: 'TrainingModel',
    required: true,
  })
  public service: TrainingModel;

  @Prop({
    type: mongoose.Schema.Types.ObjectId, ref: 'UserModel',
    required: true,
  })
  public coach: UserModel;

  @Prop({
    type: mongoose.Schema.Types.ObjectId, ref: 'UserModel',
    required: true,
  })
  public user: UserModel;
}

export const OrderSchema = SchemaFactory.createForClass(OrderModel);
