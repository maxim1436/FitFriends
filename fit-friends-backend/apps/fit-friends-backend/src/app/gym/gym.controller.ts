import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { fillObject } from '@fit-friends-backend/core';
import { GymRdo } from './rdo/gym.rdo';
import { GymService } from './gym.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger/dist';

@ApiTags('gym')
@Controller('gym')
export class GymController {
  constructor(
    private readonly GymService: GymService
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Get some gyms',
    summary: 'Get some gyms'
  })
  @Get('')
  async getSomeGyms(
    @Query() query
    ) {
    const existGyms = await this.GymService.getSomeGyms(query.count);
    return fillObject(GymRdo, existGyms);
  }

}

