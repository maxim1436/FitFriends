import {CRUDRepository} from '@fit-friends-backend/core';
import { PersonalTrainingEntity } from './personal-training.entity';
import {PersonalTraining} from '@fit-friends-backend/shared-types';
import {InjectModel} from '@nestjs/mongoose';
import { PersonalTrainingModel } from './personal-training.model';
import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';


@Injectable()
export class PersonalTrainingRepository implements CRUDRepository<PersonalTrainingEntity, string, PersonalTraining> {
  constructor(
    @InjectModel(PersonalTrainingModel.name) private readonly personalTrainingModel: Model<PersonalTrainingModel>) {
  }

  public async create(item: PersonalTrainingEntity): Promise<PersonalTraining> {
    const newPersonalTraining = new this.personalTrainingModel(item);
    return (await newPersonalTraining.save()).populate(['initiator', 'companion']);
  }

  public async findById(id: string): Promise<PersonalTraining> {
    return this.personalTrainingModel
      .findOne({_id: `${id}`})
      .populate(['initiator', 'companion'])
      .exec();
  }

  public async update(id: string, item: PersonalTrainingEntity): Promise<PersonalTraining> {
    return this.personalTrainingModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .populate(['initiator', 'companion'])
      .exec();
  }

  public async destroy(id: string): Promise<void> {
    await this.personalTrainingModel.deleteOne({_id: `${id}`});
  }


}
