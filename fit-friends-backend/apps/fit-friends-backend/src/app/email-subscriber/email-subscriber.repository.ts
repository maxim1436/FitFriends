import { CRUDRepository } from '@fit-friends-backend/core';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { Subscriber } from '@fit-friends-backend/shared-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailSubscriberModel } from './email-subscriber.model';

@Injectable()
export class EmailSubscriberRepository implements CRUDRepository<EmailSubscriberEntity, string, Subscriber> {
  constructor(
    @InjectModel(EmailSubscriberModel.name) private readonly emailSubscriberModel: Model<EmailSubscriberModel>
  ) {}

  public async create(item: EmailSubscriberEntity): Promise<Subscriber> {
    const newEmailSubscriber = new this.emailSubscriberModel(item);
    return await newEmailSubscriber.save();
  }

  public async destroy(id: string): Promise<void> {
    this.emailSubscriberModel.deleteOne({ _id: `${id}` });
  }

  public async findById(id: string): Promise<Subscriber | null> {
    return this.emailSubscriberModel
        .findOne({ _id: `${id}` })
        .exec();
  }

  public async update(id: string, item: EmailSubscriberEntity): Promise<Subscriber> {
    return this.emailSubscriberModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }

  public async findByEmail(email: string): Promise<Subscriber | null> {
    return this.emailSubscriberModel
      .findOne({ email })
      .exec()
  }

  public async findAllSubcribers(coachEmail: string): Promise<Subscriber[]> {
    return this.emailSubscriberModel
      .find({coachEmail:{$in: [`${coachEmail}`]}})
      .exec();
  }
}
