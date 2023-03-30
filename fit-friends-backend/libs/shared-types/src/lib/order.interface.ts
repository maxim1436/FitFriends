import { OrderType } from "./order-type.enum";

export interface Order {
  _id?: string;
  orderType: OrderType;
  serviceId?: string;
  coachId?: string;
  price: number;
  amount: number;
  totalPrice: number;
  paymentType: string;
  dateBirth: Date;
}
