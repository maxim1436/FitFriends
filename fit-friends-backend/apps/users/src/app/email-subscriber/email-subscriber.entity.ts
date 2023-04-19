// import { Entity } from '@readme/core';
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
    this.email = entity.email;
    this.userId = entity.userId;
    this.coachEmail = entity.coachEmail;
    this.id = entity.id ?? '';
  }

  public toObject(): EmailSubscriberEntity {
    return { ...this };
  }
}
