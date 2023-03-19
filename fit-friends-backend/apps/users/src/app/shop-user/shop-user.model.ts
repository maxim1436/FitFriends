import { Document } from 'mongoose';
import { User, UserRole, CoachSurvey, UserSurvey } from '@fit-friends-backend/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'users',
})
export class ShopUserModel extends Document implements User {

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;


  @Prop({
    required: true,
  })
  public firstname: string;

  @Prop({
    required: false,
  })
  public avatar: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
  })
  public userRole: UserRole;

  @Prop({
    required: false,
  })
  public dateBirth: Date;

  @Prop({
    required: true,
  })
  public location: string;

  @Prop({
    required: true,
  })
  public gender: string;

  @Prop({
    required: false,
    type: Object,
  })
  public coachSurvey: CoachSurvey

  @Prop({
    required: false,
    type: Object,
  })
  public userSurvey: UserSurvey
}

export const ShopUserSchema = SchemaFactory.createForClass(ShopUserModel);
