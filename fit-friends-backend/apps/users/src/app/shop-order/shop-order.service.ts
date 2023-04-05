import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { fillObject } from '@fit-friends-backend/core';
import { TrainingRdo } from '../shop-training/rdo/training.rdo';
import { ShopOrderRepository } from './shop-order.repository';
import { UserRole } from '@fit-friends-backend/shared-types';
import { ShopOrderEntity } from '../shop-order/shop-order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderMessage } from './shop-order.constant';
import { OrderType } from '@fit-friends-backend/shared-types';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ShopUserService } from '../shop-user/shop-user.service';
import { ShopTrainingService } from '../shop-training/shop-training.service';
import dayjs from 'dayjs';

const ORDER_TYPE_TRAINING = 'тренировка';

@Injectable()
export class ShopOrderService {
  constructor(
    private readonly ShopOrderRepository: ShopOrderRepository,
    private readonly ShopUserService: ShopUserService,
    private readonly ShopTrainingService: ShopTrainingService
  ) {}

  async create(dto: CreateOrderDto, serviceId: string) {

    const existTraining = fillObject(TrainingRdo, await this.ShopTrainingService.getTraining(serviceId));

    if(!existTraining) {
      throw new HttpException(OrderMessage.TRAINING_NOT_FOUND, HttpStatus.CONFLICT);
    }

    const {orderType, amount, paymentType, dateBirth, price} = dto;

    const shopOrder = {
      orderType: orderType === ORDER_TYPE_TRAINING ? OrderType.Training: OrderType.Gym,
      serviceId: serviceId, coachId: existTraining.coachId.id, price,
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

    return this.ShopOrderRepository.update(id, shopOrderEntity);
  }

  async getOrder(id: string) {
    return this.ShopOrderRepository.findById(id);
  }

  async getAllOrders(coachId: string) {
    const existUser = await this.ShopUserService.getUser(coachId);

    if (!existUser) {
      throw new UnauthorizedException(OrderMessage.AUTH_USER_NOT_FOUND);
    }

    if (existUser.userRole === UserRole.User) {
      throw new UnauthorizedException(OrderMessage.AUTH_USER_ROLE_WRONG);
    }

    return this.ShopOrderRepository.findAllOrders(coachId);
  }
}
