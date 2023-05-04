import { CRUDRepository } from "@fit-friends-backend/core";
import { FoodDiaryEntity } from "./food-diary.entity";
import { FoodDiary } from "@fit-friends-backend/shared-types";
import { InjectModel } from "@nestjs/mongoose";
import { FoodDiaryModel } from "./food-diary.model";
import { Model } from "mongoose";
import { Injectable} from '@nestjs/common';

@Injectable()
export class FoodDiaryRepository implements CRUDRepository<FoodDiaryEntity, string, FoodDiary> {
  constructor(
    @InjectModel(FoodDiaryModel.name) private readonly foodDiaryModel: Model<FoodDiaryModel>) {
  }

  public async create(item: FoodDiaryEntity): Promise<FoodDiary> {
    const newFoodDiary = new this.foodDiaryModel(item);
    return (await newFoodDiary.save()).populate(['userId']);
  }

  public async findById(id: string): Promise<FoodDiary> {
    return this.foodDiaryModel
      .findOne({_id: `${id}`})
      .populate(['userId'])
      .exec();
  }

  public async update(id: string, item: FoodDiaryEntity): Promise<FoodDiary> {
    return this.foodDiaryModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .populate(['userId'])
      .exec();
  }

  public async destroy(id: string): Promise<void> {
    await this.foodDiaryModel.deleteOne({_id: `${id}`});
  }

}
