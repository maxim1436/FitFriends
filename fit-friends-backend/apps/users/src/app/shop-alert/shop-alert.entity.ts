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
    this._id = shopAlert._id;
    this.createdAt = shopAlert.createdAt;
    this.userId = shopAlert.user;
    this.alertText = shopAlert.alertText;

  }

}
