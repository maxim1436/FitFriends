import { Alert } from '@fit-friends-backend/shared-types';

export class AlertEntity implements Alert {
  public _id: string;
  public createdAt: Date;
  public userId: string;
  public alertText: string;

  constructor(alert: Alert) {
    this.fillEntity(alert);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(alert: Alert) {
    const {_id, createdAt, user, alertText} = alert;

    this._id = _id;
    this.createdAt = createdAt;
    this.userId = user;
    this.alertText = alertText;

  }

}
