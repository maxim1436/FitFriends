import { Document } from 'mongoose';
import { Alert } from '@fit-friends-backend/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ShopUserModel } from '../shop-user/shop-user.model';

@Schema({
  collection: 'alerts',
})
export class ShopAlertModel extends Document implements Alert {

  @Prop({
    required: true,
    minlength: [1, 'Min length for title is 1'],
    maxlength: [15, 'Max length for title is 15'],
  })
  public createdAt: Date;

  @Prop({
    required: true,
    minlength: [10, 'Min length for title is 10'],
    maxlength: [140, 'Max length for title is 140'],
  })
  public alertText: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId, ref: 'ShopUserModel',
    required: true,
  })
  public userId: ShopUserModel;

}

export const ShopAlertSchema = SchemaFactory.createForClass(ShopAlertModel);
