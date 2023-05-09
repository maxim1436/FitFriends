import { Order, OrderType } from "@fit-friends-backend/shared-types";

export class OrderEntity implements Order {
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

  constructor(order: Order) {
    this.fillEntity(order);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(order: Order) {
    const {_id, orderType, serviceId, coachId, userId, price,
       amount, totalPrice, paymentType, dateBirth} = order;

    this._id = _id;
    this.orderType = orderType;
    this.service = serviceId;
    this.coach = coachId;
    this.user = userId;
    this.price = price;
    this.amount = amount;
    this.totalPrice = totalPrice;
    this.paymentType = paymentType;
    this.dateBirth = dateBirth;
  }
}
