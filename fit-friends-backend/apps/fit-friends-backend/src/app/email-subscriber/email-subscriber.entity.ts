import { Entity } from '@fit-friends-backend/core';
import { Subscriber } from '@fit-friends-backend/shared-types';

export class EmailSubscriberEntity implements Entity<EmailSubscriberEntity>, Subscriber {
  public id: string;
  public email: string;
  public coachEmail: string[];
  public userId: string;

  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity) {
    const {email, userId, coachEmail, id} = entity;

    this.email = email;
    this.userId = userId;
    this.coachEmail = coachEmail;
    this.id = id ?? '';
  }

  public toObject(): EmailSubscriberEntity {
    return { ...this };
  }
}
