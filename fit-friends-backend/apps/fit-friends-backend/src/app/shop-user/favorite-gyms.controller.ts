import { Controller, Get, Param, UseGuards, Patch, Request, Query } from '@nestjs/common';
import { fillObject } from '@fit-friends-backend/core';
import { UserRdo } from '../auth/rdo/user.rdo';
import { ShopUserService } from './shop-user.service';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger/dist';
import { GymRdo } from '../gym/rdo/gym.rdo';

@ApiTags('favorite gyms')
@Controller('favorite-gyms')
export class FavoriteGymsController {
  constructor(
    private readonly ShopUserService: ShopUserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Get user`s favorite gyms',
    summary: 'Get user`s favorite gyms'
  })
  @Get('')
  async showFavoriteGyms(@Request() req) {
    const favoriteGyms = await this.ShopUserService.getFavoriteGyms(req.user.email);
    return fillObject(GymRdo, favoriteGyms);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Update favorite gyms list',
    summary: 'Update favorite gyms list'
  })
  @Patch('update/:gymId')
  async updateFavoriteGyms(
    @Param('gymId', MongoidValidationPipe) gymId: string,
    @Request() req,
    @Query() query
    ) {
    const existGyms = await this.ShopUserService.updateFavoriteGymsList(req.user.email, gymId, query.type);
    return fillObject(UserRdo, existGyms);
  }

}
