import {CRUDRepository} from '@fit-friends-backend/core';
import {ShopUserEntity} from './shop-user.entity';
import {User} from '@fit-friends-backend/shared-types';
import {InjectModel} from '@nestjs/mongoose';
import {ShopUserModel} from './shop-user.model';
import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';

@Injectable()
export class ShopUserRepository implements CRUDRepository<ShopUserEntity, string, User> {
  constructor(
    @InjectModel(ShopUserModel.name) private readonly shopUserModel: Model<ShopUserModel>) {
  }

  public async create(item: ShopUserEntity): Promise<User> {
    const newShopUser = new this.shopUserModel(item);
    return newShopUser.save();
  }

  public async destroy(id: string): Promise<void> {
    this.shopUserModel.deleteOne({id});
  }

  public async findById(id: string): Promise<User | null> {
    return this.shopUserModel
      .findOne({id})
      .exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.shopUserModel
      .findOne({email})
      .exec();
  }

  public async update(id: string, item: ShopUserEntity): Promise<User> {
    return this.shopUserModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }
}
