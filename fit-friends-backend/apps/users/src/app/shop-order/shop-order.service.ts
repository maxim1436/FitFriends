import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ShopOrderRepository } from './shop-order.repository';
import { ShopOrderEntity } from '../shop-order/shop-order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderMessage } from './shop-order.constant';
import { OrderType } from '@fit-friends-backend/shared-types';
import { UpdateOrderDto } from './dto/update-order.dto';
import dayjs from 'dayjs';

@Injectable()
export class ShopOrderService {
  constructor(
    private readonly ShopOrderRepository: ShopOrderRepository
  ) {}

  async create(dto: CreateOrderDto, id: string, coachId: string) {
    const {orderType, amount, paymentType, dateBirth, price} = dto;

    const shopOrder = {
      orderType: orderType === 'тренировка' ? OrderType.Training: OrderType.Gym,
      serviceId: id, coachId: coachId, price,
      amount, totalPrice: amount * price, paymentType,
      dateBirth: dayjs(dateBirth).toDate()
    };

    const OrderEntity = await new ShopOrderEntity(shopOrder);

      const createdOrder = await this.ShopOrderRepository
      .create(OrderEntity);

    return createdOrder;
  }

  async update(id: string, dto: UpdateOrderDto) {
    const {amount, paymentType} = dto;

    const existOrder = await this.ShopOrderRepository.findById(id);

    const dtoData = Object.assign(dto, {totalPrice: amount * existOrder.price})

    if (!existOrder) {
      throw new UnauthorizedException(OrderMessage.ORDER_NOT_FOUND);
    }

    const shopOrderEntity = Object.assign(new ShopOrderEntity(existOrder), dtoData);
    console.log(shopOrderEntity);

    return this.ShopOrderRepository.update(id, shopOrderEntity);
  }

  async getOrder(id: string) {
    return this.ShopOrderRepository.findById(id);
  }

  async getAllOrders(coachId: string) {
    return this.ShopOrderRepository.findAllOrders(coachId);
  }
}
