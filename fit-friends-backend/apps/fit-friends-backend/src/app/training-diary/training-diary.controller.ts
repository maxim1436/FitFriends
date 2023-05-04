import { Body, Controller, Post, Get, Param, UseGuards, Patch, Request, Delete } from '@nestjs/common';
import { fillObject } from '@fit-friends-backend/core';
import { TrainingDiaryRdo } from './rdo/training-diary.rdo';
import { TrainingDiaryService } from './training-diary.service';
import { CreateTrainingDiaryDto } from './dto/create-training-diary.dto';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateTrainingDiaryDto } from './dto/update-training-diary.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger/dist';

@ApiTags('training diary')
@Controller('training-diary')
export class TrainingDiaryController {
  constructor(
    private readonly TrainingDiaryService: TrainingDiaryService
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Create new training diary',
    summary: 'Create new training diary'
  })
  @Post('create/:orderId')
  async create(
    @Param('orderId', MongoidValidationPipe) orderId: string,
    @Body() dto: CreateTrainingDiaryDto,
    @Request() req
  ) {
    const newTrainingDiary = await this.TrainingDiaryService.create(dto, req.user.email, orderId);
    return fillObject(TrainingDiaryRdo, newTrainingDiary);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Update training diary',
    summary: 'Update training diary'
  })
  @Patch(':trainingDiaryId')
  async update(
    @Param('trainingDiaryId', MongoidValidationPipe) trainingDiaryId: string,
    @Body() dto: UpdateTrainingDiaryDto,
    @Request() req
  ) {
    const updatedTrainingDiary = await this.TrainingDiaryService.update(trainingDiaryId, dto, req.user.email);
    return fillObject(TrainingDiaryRdo, updatedTrainingDiary);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Get full information about training diary',
    summary: 'Get full information about training diary'
  })
  @Get(':trainingDiaryId')
  async getTrainingDiary(
    @Param('trainingDiaryId', MongoidValidationPipe) trainingDiaryId: string,
    @Request() req
    ) {
    const existTrainingDiary = await this.TrainingDiaryService.getTrainingDiary(trainingDiaryId, req.user.email);
    return fillObject(TrainingDiaryRdo, existTrainingDiary);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Delete training diary',
    summary: 'Delete training diary'
  })
  @Delete(':trainingDiaryId')
  async deleteTrainingDiary(
    @Param('trainingDiaryId', MongoidValidationPipe) trainingDiaryId: string,
    @Request() req
    ) {
    const deletedTrainingDiary = await this.TrainingDiaryService.deleteTrainingDiary(trainingDiaryId, req.user.email);
    return deletedTrainingDiary;
  }
}
