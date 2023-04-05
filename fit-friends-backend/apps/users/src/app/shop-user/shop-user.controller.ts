import { Body, Controller, Post, Get, Param, UseGuards, Patch, Request } from '@nestjs/common';
import { fillObject } from '@fit-friends-backend/core';
import { UserRdo } from '../auth/rdo/user.rdo';
import { ShopUserService } from './shop-user.service';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger/dist';

@ApiTags('user')
@Controller('user')
export class ShopUserController {
  constructor(
    private readonly ShopUserService: ShopUserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.ShopUserService.getUser(id);
    return fillObject(UserRdo, existUser);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id', MongoidValidationPipe) id: string, @Body() dto: UpdateUserDto, @Request() req) {
    const updatedUser = await this.ShopUserService.updateUser(id, dto, req.user.email);
    return fillObject(UserRdo, updatedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/users/:count')
  async showUsers(
    @Param('id', MongoidValidationPipe) id: string,
    @Request() req,
    @Param('count') count?: number
  ) {
    const existsUsers = await this.ShopUserService.getUsers(id, req.user.email, count);
    return fillObject(UserRdo, existsUsers);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/friends')
  async showFriends(@Param('id', MongoidValidationPipe) id: string) {
    const friends = await this.ShopUserService.getFriends(id);
    return fillObject(UserRdo, friends);
  }
}
