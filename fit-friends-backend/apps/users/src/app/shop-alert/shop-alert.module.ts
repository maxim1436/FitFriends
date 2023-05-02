import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ShopAlertModel, ShopAlertSchema} from './shop-alert.model';
import {ShopAlertRepository} from './shop-alert.repository';

@Module({
  imports: [MongooseModule.forFeature([
    { name: ShopAlertModel.name, schema: ShopAlertSchema }
  ])
],
  providers: [ShopAlertRepository],
  exports: [ShopAlertRepository],
})

export class ShopAlertModule {}
