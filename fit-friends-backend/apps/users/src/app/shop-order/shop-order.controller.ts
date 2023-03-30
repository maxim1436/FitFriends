import { Body, Controller, Post, Get, Param, UseGuards, Patch } from '@nestjs/common';
import { fillObject } from '@fit-friends-backend/core';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ShopOrderService } from './shop-order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserOrderRdo } from './rdo/user-order.rdo';
import { CoachOrderRdo } from './rdo/coach-order.rdo';

@Controller('order')
export class ShopOrderController {
  constructor(
    private readonly shopOrderService: ShopOrderService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id/:serviceId/:coachId')
  async createOrder(
    @Param('id', MongoidValidationPipe) id: string,
    @Body() dto: CreateOrderDto,
    @Param('serviceId', MongoidValidationPipe) serviceId: string,
    @Param('coachId', MongoidValidationPipe) coachId: string
  ) {
    const newOrder = await this.shopOrderService.create(dto, serviceId, coachId);
    return fillObject(UserOrderRdo, newOrder);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/:coachId')
  async getAllOrders(
    @Param('id', MongoidValidationPipe) id: string,
    @Param('coachId', MongoidValidationPipe) coachId: string
  ) {
    const getAllOrdersForCoach = await this.shopOrderService.getAllOrders(coachId);
    return fillObject(CoachOrderRdo, getAllOrdersForCoach);
  }
}
