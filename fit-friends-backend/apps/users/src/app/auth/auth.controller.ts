import { Body, Controller, Post, Get, Param, UseGuards, Patch } from '@nestjs/common';
import { fillObject } from '@fit-friends-backend/core';
import { UserRdo } from './rdo/user.rdo';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ShopOrderService } from '../shop-order/shop-order.service';
import { CreateOrderDto } from '../shop-order/dto/create-order.dto';
import { UserOrderRdo } from '../shop-order/rdo/user-order.rdo';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    // private readonly shopOrderService: ShopOrderService
  ) {}

  @Post('register')
  async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    const user = await this.authService.verifyUser(dto);
    return this.authService.loginUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);
    return fillObject(UserRdo, existUser);
  }

  @Patch(':id')
  async update(@Param('id', MongoidValidationPipe) id: string, @Body() dto: UpdateUserDto) {
    const updatedUser = await this.authService.updateUser(id, dto);
    return fillObject(UserRdo, updatedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/users/:count')
  async showUsers(@Param('id', MongoidValidationPipe) id: string, @Param('count') count?: number) {
    const existsUsers = await this.authService.getUsers(count);
    return fillObject(UserRdo, existsUsers);
  }

  // @UseGuards(JwtAuthGuard)
  // @Post(':id/order/:serviceId')
  // async createOrder(
  //   @Param('id', MongoidValidationPipe) id: string,
  //   @Body() dto: CreateOrderDto,
  //   @Param('serviceId', MongoidValidationPipe) serviceId: string
  //   ) {
  //   const newOrder = await this.shopOrderService.create(dto, serviceId);
  //   return fillObject(UserOrderRdo, newOrder);
  // }
}
