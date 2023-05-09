import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AlertModel, AlertSchema} from './alert.model';
import {AlertRepository} from './alert.repository';

@Module({
  imports: [MongooseModule.forFeature([
    { name: AlertModel.name, schema: AlertSchema }
  ])
],
  providers: [AlertRepository],
  exports: [AlertRepository],
})

export class AlertModule {}
