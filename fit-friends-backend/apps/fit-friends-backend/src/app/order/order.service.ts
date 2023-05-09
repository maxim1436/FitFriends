import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { fillObject } from '@fit-friends-backend/core';
import { TrainingRdo } from '../training/rdo/training.rdo';
import { OrderRepository } from './order.repository';
import { UserRole } from '@fit-friends-backend/shared-types';
import { OrderEntity } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderMessage } from './order.constant';
import { OrderType } from '@fit-friends-backend/shared-types';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserService } from '../user/user.service';
import { TrainingService } from '../training/training.service';
import dayjs from 'dayjs';

const ORDER_TYPE_TRAINING = 'тренировка';

@Injectable()
export class OrderService {
  constructor(
    private readonly OrderRepository: OrderRepository,
    private readonly UserService: UserService,
    private readonly TrainingService: TrainingService
  ) {}

  async create(dto: CreateOrderDto, serviceId: string, orderCreatorEmail: string) {

    const existUser = await this.UserService.findByEmail(orderCreatorEmail);

    const existTraining = fillObject(TrainingRdo, await this.TrainingService.getTraining(serviceId));

    if(!existTraining) {
      throw new HttpException(OrderMessage.TRAINING_NOT_FOUND, HttpStatus.CONFLICT);
    }

    const {orderType, amount, paymentType, dateBirth, price} = dto;

    const shopOrder = {
      orderType: orderType === ORDER_TYPE_TRAINING ? OrderType.Training: OrderType.Gym,
      serviceId: serviceId, coachId: existTraining.coachId.id,
      price, userId: existUser._id, amount,
      totalPrice: amount * price, paymentType,
      dateBirth: dayjs(dateBirth).toDate()
    };

    const orderEntity = await new OrderEntity(shopOrder);

      const createdOrder = await this.OrderRepository
      .create(orderEntity);

    return createdOrder;
  }

  async update(id: string, dto: UpdateOrderDto) {
    const {amount} = dto;

    const existOrder = await this.OrderRepository.findById(id);

    const dtoData = Object.assign(dto, {totalPrice: amount * existOrder.price})

    if (!existOrder) {
      throw new UnauthorizedException(OrderMessage.ORDER_NOT_FOUND);
    }

    const orderEntity = Object.assign(new OrderEntity(existOrder), dtoData);

    return this.OrderRepository.update(id, orderEntity);
  }

  async getOrder(id: string) {
    return this.OrderRepository.findById(id);
  }

  async getAllOrders(coachId: string) {
    const existUser = await this.UserService.getUser(coachId);

    if (!existUser) {
      throw new UnauthorizedException(OrderMessage.AUTH_USER_NOT_FOUND);
    }

    if (existUser.userRole === UserRole.User) {
      throw new UnauthorizedException(OrderMessage.AUTH_USER_ROLE_WRONG);
    }

    return this.OrderRepository.findAllOrders(coachId);
  }
}
