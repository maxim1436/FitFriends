import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ShopOrderModel, ShopOrderSchema} from './shop-order.model';
import {ShopOrderRepository} from './shop-order.repository';


@Module({
  imports: [MongooseModule.forFeature([
    { name: ShopOrderModel.name, schema: ShopOrderSchema }
  ])],
  providers: [ShopOrderRepository],
  exports: [ShopOrderRepository],
})

export class ShopOrderModule {}
