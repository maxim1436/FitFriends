import { CRUDRepository } from "@fit-friends-backend/core";
import { TrainingDiaryEntity } from "./training-diary.entity";
import { TrainingDiary } from "@fit-friends-backend/shared-types";
import { InjectModel } from "@nestjs/mongoose";
import { TrainingDiaryModel } from "./training-diary.model";
import { Model } from "mongoose";
import { Injectable} from '@nestjs/common';

@Injectable()
export class TrainingDiaryRepository implements CRUDRepository<TrainingDiaryEntity, string, TrainingDiary> {
  constructor(
    @InjectModel(TrainingDiaryModel.name) private readonly trainingDiaryModel: Model<TrainingDiaryModel>) {
  }

  public async create(item: TrainingDiaryEntity): Promise<TrainingDiary> {
    const newFoodDiary = new this.trainingDiaryModel(item);
    return (await (await newFoodDiary.save()).populate(['userId', 'trainingId']));
  }

  public async findById(id: string): Promise<TrainingDiary> {
    return this.trainingDiaryModel
      .findOne({_id: `${id}`})
      .populate(['userId', 'trainingId'])
      .exec();
  }

  public async update(id: string, item: TrainingDiaryEntity): Promise<TrainingDiary> {
    return this.trainingDiaryModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .populate(['userId', 'trainingId'])
      .exec();
  }

  public async destroy(id: string): Promise<void> {
    await this.trainingDiaryModel.deleteOne({_id: `${id}`});
  }

}
