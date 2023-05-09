import { Document } from 'mongoose';
import { PersonalTraining, PersonalTrainingStatus } from '@fit-friends-backend/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { UserModel } from '../user/user.model';

@Schema({
  collection: 'personal-trainings',
})
export class PersonalTrainingModel extends Document implements PersonalTraining {

  @Prop({
    required: true,
  })
  public createdAt: Date;

  @Prop({
    required: true,
  })
  public changingStatusDate: Date;

  @Prop({
    required: true,
    type: String,
    enum: PersonalTrainingStatus,
  })
  public status: PersonalTrainingStatus;

  @Prop({
    type: mongoose.Schema.Types.ObjectId, ref: 'UserModel',
    required: true,
  })
  public initiator: UserModel;

  @Prop({
    type: mongoose.Schema.Types.ObjectId, ref: 'UserModel',
    required: true,
  })
  public companion: UserModel;

}

export const PersonalTrainingSchema = SchemaFactory.createForClass(PersonalTrainingModel);
