import { Document } from 'mongoose';
import { Comment } from '@fit-friends-backend/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ShopUserModel } from '../shop-user/shop-user.model';
import { ShopTrainingModel } from '../shop-training/shop-training.model';

@Schema({
  collection: 'comments',
})
export class CommentModel extends Document implements Comment {

  @Prop({
    required: true,
    minlength: [100, 'Min length for text is 100'],
    maxlength: [1024, 'Max length for text is 1024'],
  })
  public text: string;

  @Prop({
    required: true,
    min: [1, 'Min rating can be 1'],
    max: [5, 'Max rating can be 5'],
  })
  public rating: number;

  @Prop({
    required: true,
  })
  public dateBirth: Date;

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

export const CommentSchema = SchemaFactory.createForClass(CommentModel);
