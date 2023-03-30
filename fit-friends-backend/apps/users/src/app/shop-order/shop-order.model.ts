import { Document } from 'mongoose';
import { Order, OrderType } from '@fit-friends-backend/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ShopTrainingModel } from '../shop-training/shop-training.model';
import { ShopUserModel } from '../shop-user/shop-user.model';

@Schema({
  collection: 'orders',
})
export class ShopOrderModel extends Document implements Order {

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
    type: mongoose.Schema.Types.ObjectId, ref: 'ShopTrainingModel',
    required: true,
  })
  public service: ShopTrainingModel;

  @Prop({
    type: mongoose.Schema.Types.ObjectId, ref: 'ShopUserModel',
    required: true,
  })
  public coach: ShopUserModel;
}

export const ShopOrderSchema = SchemaFactory.createForClass(ShopOrderModel);
