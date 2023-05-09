import { Document } from 'mongoose';
import { TrainingDiary } from '@fit-friends-backend/shared-types';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { TrainingModel } from '../training/training.model';
import { UserModel } from '../user/user.model';

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
    type: mongoose.Schema.Types.ObjectId, ref: 'UserModel',
    required: true,
  })
  public userId: UserModel;

  @Prop({
    type: mongoose.Schema.Types.ObjectId, ref: 'TrainingModel',
    required: true,
  })
  public trainingId: TrainingModel;

}

export const TrainingDiarySchema = SchemaFactory.createForClass(TrainingDiaryModel);
