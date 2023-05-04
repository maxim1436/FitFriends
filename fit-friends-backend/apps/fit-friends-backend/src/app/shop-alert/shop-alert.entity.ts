import { Alert } from '@fit-friends-backend/shared-types';

export class ShopAlertEntity implements Alert {
  public _id: string;
  public createdAt: Date;
  public userId: string;
  public alertText: string;

  constructor(shopAlert: Alert) {
    this.fillEntity(shopAlert);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(shopAlert: Alert) {
    const {_id, createdAt, user, alertText} = shopAlert;

    this._id = _id;
    this.createdAt = createdAt;
    this.userId = user;
    this.alertText = alertText;

  }

}
