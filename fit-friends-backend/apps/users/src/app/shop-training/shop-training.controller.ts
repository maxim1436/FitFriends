import { Body, Controller, Post, Get, Param, UseGuards, Patch } from '@nestjs/common';
import { fillObject } from '@fit-friends-backend/core';
import { TrainingRdo } from './rdo/training.rdo';
import { ShopTrainingService } from './shop-training.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('training')
export class ShopTrainingController {
  constructor(
    private readonly ShopTrainingService: ShopTrainingService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id/create')
  async create( @Param('id', MongoidValidationPipe) id: string, @Body() dto: CreateTrainingDto) {
    const newTraining = await this.ShopTrainingService.create(dto, id);
    return fillObject(TrainingRdo, newTraining);
  }
}
