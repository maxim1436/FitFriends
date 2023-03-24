import { Document } from 'mongoose';
import { Training } from '@fit-friends-backend/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ShopUserModel } from '../shop-user/shop-user.model';

@Schema({
  collection: 'trainings',
})
export class ShopTrainingModel extends Document implements Training {

  @Prop({
    required: true,
    minlength: [1, 'Min length for title is 1'],
    maxlength: [15, 'Max length for title is 15'],
  })
  public title: string;

  @Prop({
    required: true,
  })
  public avatar: string;

  @Prop({
    required: true,
  })
  public level: string;

  @Prop({
    required: true,
  })
  public type: string;

  @Prop({
    required: true,
  })
  public time: string;

  @Prop({
    required: true,
    min: [0, 'Min price can be 0'],
  })
  public price: number;

  @Prop({
    required: true,
    min: [1000, 'Min calories can be 1000'],
    max: [5000, 'Max calories can be 5000'],
  })
  public calories: number;

  @Prop({
    required: true,
    minlength: [10, 'Min length for description is 10'],
    maxlength: [140, 'Max length for description is 140'],
  })
  public description: string;

  @Prop({
    required: true,
  })
  public gender: string;

  @Prop({
    required: true,
  })
  public videoLink: string;

  @Prop({
    required: true,
    default: 0,
  })
  public rating: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId, ref: 'ShopUserModel',
    required: true,
  })
  public coachId: ShopUserModel;

  @Prop({
    required: true,
  })
  public special: boolean;
}

export const ShopTrainingSchema = SchemaFactory.createForClass(ShopTrainingModel);
