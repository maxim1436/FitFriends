import { Order, OrderType } from "@fit-friends-backend/shared-types";

export class ShopOrderEntity implements Order {
  public _id?: string;
  public orderType: OrderType;
  public service: string;
  public price: number;
  public amount: number;
  public totalPrice: number;
  public paymentType: string;
  public dateBirth: Date;
  public coach: string;
  public user: string;

  constructor(shopOrder: Order) {
    this.fillEntity(shopOrder);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(shopOrder: Order) {
    this._id = shopOrder._id;
    this.orderType = shopOrder.orderType;
    this.service = shopOrder.serviceId;
    this.coach = shopOrder.coachId;
    this.user = shopOrder.userId;
    this.price = shopOrder.price;
    this.amount = shopOrder.amount;
    this.totalPrice = shopOrder.totalPrice;
    this.paymentType = shopOrder.paymentType;
    this.dateBirth = shopOrder.dateBirth;
  }
}
