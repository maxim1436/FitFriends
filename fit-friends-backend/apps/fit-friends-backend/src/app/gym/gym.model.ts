import { Document } from 'mongoose';
import { Gym } from '@fit-friends-backend/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'gyms',
})
export class GymModel extends Document implements Gym {

  @Prop({
    required: true,
    minlength: [1, 'Min length for title is 1'],
    maxlength: [15, 'Max length for title is 15'],
  })
  public title: string;

  @Prop({
    required: true,
  })
  public location: string;

  @Prop({
    required: true,
  })
  public verify: boolean;

  @Prop({
    required: true,
  })
  public parameters: string[];

  @Prop({
    required: true,
    maxlength: 5
  })
  public photos: string[];

  @Prop({
    required: true,
    maxlength: [140, 'Max length for description is 140'],
  })
  public description: string;

  @Prop({
    required: true,
    min: [100, 'Min price can be 100'],
    max: [5000, 'Max price can be 5000'],
  })
  public price: number;

  @Prop({
    required: true,
  })
  public dateBirth: Date;

}

export const GymSchema = SchemaFactory.createForClass(GymModel);
