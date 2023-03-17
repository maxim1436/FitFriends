import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ShopUserModel, ShopUserSchema} from './shop-user.model';
import {ShopUserRepository} from './shop-user.repository';


@Module({
  imports: [MongooseModule.forFeature([
    { name: ShopUserModel.name, schema: ShopUserSchema }
  ])],
  providers: [ShopUserRepository],
  exports: [ShopUserRepository],
})

export class ShopUserModule {}
