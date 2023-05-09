import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {OrderModel, OrderSchema} from './order.model';
import {OrderRepository} from './order.repository';


@Module({
  imports: [MongooseModule.forFeature([
    { name: OrderModel.name, schema: OrderSchema }
  ])],
  providers: [OrderRepository],
  exports: [OrderRepository],
})

export class OrderModule {}
