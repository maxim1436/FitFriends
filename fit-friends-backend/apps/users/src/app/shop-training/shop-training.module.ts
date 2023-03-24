import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ShopTrainingModel, ShopTrainingSchema} from './shop-training.model';
import {ShopTrainingRepository} from './shop-training.repository';


@Module({
  imports: [MongooseModule.forFeature([
    { name: ShopTrainingModel.name, schema: ShopTrainingSchema }
  ])],
  providers: [ShopTrainingRepository],
  exports: [ShopTrainingRepository],
})

export class ShopTrainingModule {}
