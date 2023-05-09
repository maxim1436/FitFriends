import {CRUDRepository} from '@fit-friends-backend/core';
import {UserEntity} from './user.entity';
import {User} from '@fit-friends-backend/shared-types';
import {InjectModel} from '@nestjs/mongoose';
import {UserModel} from './user.model';
import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import { DEFAULT_USER_COUNT } from './user.constant';

@Injectable()
export class UserRepository implements CRUDRepository<UserEntity, string, User> {
  constructor(
    @InjectModel(UserModel.name) private readonly UserModel: Model<UserModel>) {
  }

  public async create(item: UserEntity): Promise<User> {
    const newShopUser = new this.UserModel(item);
    return newShopUser.save();
  }

  public async destroy(id: string): Promise<void> {
    this.UserModel.deleteOne({id});
  }

  public async findById(id: string): Promise<User | null> {
    return this.UserModel
      .findOne({_id: `${id}`})
      .exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.UserModel
      .findOne({email})
      .exec();
  }

  public async update(id: string, item: UserEntity): Promise<User> {
    return this.UserModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }

  public async findMockCoaches(coachesEmailArray: string[]): Promise<User[]> {
    return this.UserModel
      .find({email :{$in: [`${coachesEmailArray}`]}})
      .exec();
  }

  public async findByDefault (count?: number): Promise<User[]> {
    if (count >= DEFAULT_USER_COUNT) {
      const limit = DEFAULT_USER_COUNT;
      return this.UserModel
      .find({}, {}, {limit})
      .exec();
    } else {
      const limit = count;
      return this.UserModel
      .find({}, {}, {limit})
      .exec();
    }
  }

  public async findFriends(friendsIdArray: string[]): Promise<User[]> {
    return this.UserModel
      .find({_id :{$in: [`${friendsIdArray}`]}})
      .exec();
  }
}
