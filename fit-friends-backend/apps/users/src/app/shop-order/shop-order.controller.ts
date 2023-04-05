import { Body, Controller, Post, Get, Param, UseGuards, Patch } from '@nestjs/common';
import { fillObject } from '@fit-friends-backend/core';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ShopOrderService } from './shop-order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserOrderRdo } from './rdo/user-order.rdo';
import { CoachOrderRdo } from './rdo/coach-order.rdo';
import { ApiTags } from '@nestjs/swagger/dist';

@ApiTags('order')
@Controller('order')
export class ShopOrderController {
  constructor(
    private readonly shopOrderService: ShopOrderService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':serviceId')
  async createOrder(
    @Body() dto: CreateOrderDto,
    @Param('serviceId', MongoidValidationPipe) serviceId: string,
  ) {
    const newOrder = await this.shopOrderService.create(dto, serviceId);
    return fillObject(UserOrderRdo, newOrder);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':coachId')
  async getAllOrders(
    @Param('coachId', MongoidValidationPipe) coachId: string
  ) {
    const getAllOrdersForCoach = await this.shopOrderService.getAllOrders(coachId);
    return fillObject(CoachOrderRdo, getAllOrdersForCoach);
  }
}
