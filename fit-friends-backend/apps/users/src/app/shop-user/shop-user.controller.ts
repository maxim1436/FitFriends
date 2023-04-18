import { Body, Controller, Post, Get, Param, UseGuards, Patch, Request, Query } from '@nestjs/common';
import { fillObject } from '@fit-friends-backend/core';
import { UserRdo } from '../auth/rdo/user.rdo';
import { ShopUserService } from './shop-user.service';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger/dist';
import { UpdateUserBalanceDto } from '../auth/dto/update-user-balance.dto';

@ApiTags('user')
@Controller('user')
export class ShopUserController {
  constructor(
    private readonly ShopUserService: ShopUserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Get full information about user',
    summary: 'Get full information about user'
  })
  @Get(':id')
  async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.ShopUserService.getUser(id);
    return fillObject(UserRdo, existUser);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Update user',
    summary: 'Update user'
  })
  @Patch('update')
  async update(@Body() dto: UpdateUserDto, @Request() req) {
    const updatedUser = await this.ShopUserService.updateUser(dto, req.user.email);
    return fillObject(UserRdo, updatedUser);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Get some users',
    summary: 'Get some users'
  })
  @Get('')
  async showUsers(
    @Request() req,
    @Query() query
  ) {
    const existsUsers = await this.ShopUserService.getUsers(req.user.email, query.count);
    return fillObject(UserRdo, existsUsers);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Get user`s friends',
    summary: 'Get user`s friends'
  })
  @Get(':id/friends')
  async showFriends(@Param('id', MongoidValidationPipe) id: string, @Request() req) {
    const friends = await this.ShopUserService.getFriends(id, req.user.email);
    return fillObject(UserRdo, friends);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Update friend list',
    summary: 'Update friend list'
  })
  @Patch('updateFriends/:id')
  async updateFriends(
    @Param('id', MongoidValidationPipe) id: string,
    @Request() req,
    @Query() query
  ) {
    const updateFriendsList = await this.ShopUserService.updateFriendsList(req.user.email, id, query.type);
    return fillObject(UserRdo, updateFriendsList);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Update user balance',
    summary: 'Update user balance'
  })
  @Patch('updateUserBalance')
  async updateUserBalance(
    @Body() dto: UpdateUserBalanceDto,
    @Request() req,
    @Query() query
  ) {
    const updateUserBalance = await this.ShopUserService.updateUserBalance(req.user.email, dto, query.type);
    return fillObject(UserRdo, updateUserBalance);
  }
}
