import { Document } from 'mongoose';
import { TrainingDiary } from '@fit-friends-backend/shared-types';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ShopTrainingModel } from '../shop-training/shop-training.model';
import { ShopUserModel } from '../shop-user/shop-user.model';

@Schema({
  collection: 'training-diaries',
})
export class TrainingDiaryModel extends Document implements TrainingDiary {

  @Prop({
    required: true,
  })
  public caloriesSpentAmount: number;

  @Prop({
    required: true,
  })
  public date: Date;

  @Prop({
    required: true,
  })
  public timeSpentAmount: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId, ref: 'ShopUserModel',
    required: true,
  })
  public userId: ShopUserModel;

  @Prop({
    type: mongoose.Schema.Types.ObjectId, ref: 'ShopTrainingModel',
    required: true,
  })
  public trainingId: ShopTrainingModel;

}

export const TrainingDiarySchema = SchemaFactory.createForClass(TrainingDiaryModel);
