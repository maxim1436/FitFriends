import { Body, Controller, Post, Get, Param, UseGuards, Patch, Request, Query } from '@nestjs/common';
import { fillObject } from '@fit-friends-backend/core';
import { TrainingRdo } from './rdo/training.rdo';
import { ShopTrainingService } from './shop-training.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { FilterTrainingDto } from './dto/filter-training.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger/dist';

@ApiTags('training')
@Controller('training')
export class ShopTrainingController {
  constructor(
    private readonly ShopTrainingService: ShopTrainingService
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Create new training',
    summary: 'Create new training'
  })
  @Post('create')
  async create(
    @Body() dto: CreateTrainingDto,
    @Request() req
  ) {
    const newTraining = await this.ShopTrainingService.create(dto, req.user.email);
    return fillObject(TrainingRdo, newTraining);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Update training',
    summary: 'Update training'
  })
  @Patch(':trainingId')
  async update(
    @Param('trainingId', MongoidValidationPipe) trainingId: string,
    @Body() dto: UpdateTrainingDto,
    @Request() req
  ) {
    const updatedTraining = await this.ShopTrainingService.update(trainingId, dto, req.user.email);
    return fillObject(TrainingRdo, updatedTraining);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Get full information about training',
    summary: 'Get full information about training'
  })
  @Get(':trainingId')
  async getTraining(@Param('trainingId', MongoidValidationPipe) trainingId: string) {
    const existTraining = await this.ShopTrainingService.getTraining(trainingId);
    return fillObject(TrainingRdo, existTraining);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Get some trainings',
    summary: 'Get some trainings'
  })
  @Get('')
  async showTrainings(
    @Request() req,
    @Body() dto: FilterTrainingDto,
    @Query() query
    ) {
    const existsTrainings = await this.ShopTrainingService.getSomeTrainings(req.user.email, dto, query.count);
    return fillObject(TrainingRdo, existsTrainings);
  }
}

