import { Document } from 'mongoose';
import { FoodDiary, TypeOfEating } from '@fit-friends-backend/shared-types';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { UserModel } from '../user/user.model';

@Schema({
  collection: 'food-diaries',
})
export class FoodDiaryModel extends Document implements FoodDiary {

  @Prop({
    required: true,
  })
  public caloriesAmount: number;

  @Prop({
    required: true,
  })
  public date: Date;

  @Prop({
    required: true,
    type: String,
    enum: TypeOfEating,
  })
  public typeOfEating: TypeOfEating;

  @Prop({
    type: mongoose.Schema.Types.ObjectId, ref: 'UserModel',
    required: true,
  })
  public userId: UserModel;

}

export const FoodDiarySchema = SchemaFactory.createForClass(FoodDiaryModel);
