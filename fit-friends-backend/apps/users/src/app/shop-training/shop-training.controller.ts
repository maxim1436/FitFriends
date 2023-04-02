import { Body, Controller, Post, Get, Param, UseGuards, Patch } from '@nestjs/common';
import { fillObject } from '@fit-friends-backend/core';
import { TrainingRdo } from './rdo/training.rdo';
import { ShopTrainingService } from './shop-training.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { FilterTrainingDto } from './dto/filter-training.dto';

@Controller('training')
export class ShopTrainingController {
  constructor(
    private readonly ShopTrainingService: ShopTrainingService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id/create')
  async create(
    @Param('id', MongoidValidationPipe) id: string,
    @Body() dto: CreateTrainingDto
  ) {
    const newTraining = await this.ShopTrainingService.create(dto, id);
    return fillObject(TrainingRdo, newTraining);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/:trainingId')
  async update(
    @Param('id', MongoidValidationPipe) id: string,
    @Param('trainingId', MongoidValidationPipe) trainingId: string,
    @Body() dto: UpdateTrainingDto
  ) {
    const updatedTraining = await this.ShopTrainingService.update(id, trainingId, dto);
    return fillObject(TrainingRdo, updatedTraining);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/:trainingId')
  async getTraining(@Param('trainingId', MongoidValidationPipe) trainingId: string) {
    const existTraining = await this.ShopTrainingService.getTraining(trainingId);
    return fillObject(TrainingRdo, existTraining);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/trainings/:count')
  async showTrainings(
    @Param('id', MongoidValidationPipe) id: string,
    @Body() dto: FilterTrainingDto,
    @Param('count') count?: number
    ) {
    const existsTrainings = await this.ShopTrainingService.getSomeTrainings(id, dto, count);
    return fillObject(TrainingRdo, existsTrainings);
  }
}

