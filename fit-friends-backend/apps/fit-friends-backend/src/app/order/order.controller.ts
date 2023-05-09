import { Body, Controller, Post, Get, Param, UseGuards, Request } from '@nestjs/common';
import { fillObject } from '@fit-friends-backend/core';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserOrderRdo } from './rdo/user-order.rdo';
import { CoachOrderRdo } from './rdo/coach-order.rdo';
import { ApiTags, ApiOperation } from '@nestjs/swagger/dist';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Create new order',
    summary: 'Create new order'
  })
  @Post(':serviceId')
  async createOrder(
    @Body() dto: CreateOrderDto,
    @Param('serviceId', MongoidValidationPipe) serviceId: string,
    @Request() req
  ) {
    const newOrder = await this.orderService.create(dto, serviceId, req.user.email);
    return fillObject(UserOrderRdo, newOrder);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Get all orders for coach',
    summary: 'Get all orders for coach'
  })
  @Get(':coachId')
  async getAllOrders(
    @Param('coachId', MongoidValidationPipe) coachId: string
  ) {
    const getAllOrdersForCoach = await this.orderService.getAllOrders(coachId);
    return fillObject(CoachOrderRdo, getAllOrdersForCoach);
  }
}
