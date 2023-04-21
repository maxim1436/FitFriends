import { Body, Controller, Post, Get, Param, UseGuards, Patch, Request, Query, Delete } from '@nestjs/common';
import { fillObject } from '@fit-friends-backend/core';
import { AlertRdo } from './rdo/alert.rdo';
import { ShopAlertService } from './shop-alert.service';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger/dist';

@ApiTags('alert')
@Controller('alert')
export class ShopAlertController {
  constructor(
    private readonly ShopAlertService: ShopAlertService
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Get full information about alert',
    summary: 'Get full information about alert'
  })
  @Get(':alertId')
  async getAlert(@Param('alertId', MongoidValidationPipe) alertId: string, @Request() req,) {
    const existAlert = await this.ShopAlertService.getAlert(req.user.email, alertId);
    return fillObject(AlertRdo, existAlert);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Get some alerts',
    summary: 'Get some alerts'
  })
  @Get('')
  async showAlerts(
    @Request() req,
    @Query() query
    ) {
    const existsAlerts = await this.ShopAlertService.getSomeAlerts(req.user.email, query.count);
    return fillObject(AlertRdo, existsAlerts);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Delete alert',
    summary: 'Delete alert'
  })
  @Delete(':alertId')
  async deleteAlert(
    @Param('alertId', MongoidValidationPipe) alertId: string,
    @Request() req
    ) {
    const deletedTrainingDiary = await this.ShopAlertService.deleteAlert(alertId, req.user.email);
    return deletedTrainingDiary;
  }
}
