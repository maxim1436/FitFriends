import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {TrainingModel, TrainingSchema} from './training.model';
import {TrainingRepository} from './training.repository';


@Module({
  imports: [MongooseModule.forFeature([
    { name: TrainingModel.name, schema: TrainingSchema }
  ])],
  providers: [TrainingRepository],
  exports: [TrainingRepository],
})

export class TrainingModule {}
