import { Controller, Get, Param, UseGuards, Patch, Request, Query } from '@nestjs/common';
import { fillObject } from '@fit-friends-backend/core';
import { UserRdo } from '../auth/rdo/user.rdo';
import { ShopUserService } from './shop-user.service';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger/dist';

@ApiTags('friends')
@Controller('friends')
export class FriendsController {
  constructor(
    private readonly ShopUserService: ShopUserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Get user`s friends',
    summary: 'Get user`s friends'
  })
  @Get('')
  async showFriends(@Request() req) {
    const friends = await this.ShopUserService.getFriends(req.user.email);
    return fillObject(UserRdo, friends);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Update friend list',
    summary: 'Update friend list'
  })
  @Patch('update-friends/:id')
  async updateFriends(
    @Param('id', MongoidValidationPipe) id: string,
    @Request() req,
    @Query() query
  ) {
    const updateFriendsList = await this.ShopUserService.updateFriendsList(req.user.email, id, query.type);
    return fillObject(UserRdo, updateFriendsList);
  }

}
