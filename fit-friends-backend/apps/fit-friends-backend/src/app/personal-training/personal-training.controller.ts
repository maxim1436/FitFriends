import { Body, Controller, Post, Get, Param, UseGuards, Patch, Request } from '@nestjs/common';
import { fillObject } from '@fit-friends-backend/core';
import { PersonalTrainingRdo } from './rdo/personal-training.rdo';
import { PersonalTrainingService } from './personal-training.service';
import { CreatePersonalTrainingDto } from './dto/create-personal-training.dto';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdatePersonalTrainingDto } from './dto/update-personal-training.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger/dist';

@ApiTags('personal training')
@Controller('personal-training')
export class PersonalTrainingController {
  constructor(
    private readonly PersonalTrainingService: PersonalTrainingService
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Create new personal training',
    summary: 'Create new personal training'
  })
  @Post('create')
  async create(
    @Body() dto: CreatePersonalTrainingDto,
    @Request() req
  ) {
    const newTraining = await this.PersonalTrainingService.create(dto, req.user.email);
    return fillObject(PersonalTrainingRdo, newTraining);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Update personal training',
    summary: 'Update personal training'
  })
  @Patch(':trainingId')
  async update(
    @Param('trainingId', MongoidValidationPipe) trainingId: string,
    @Body() dto: UpdatePersonalTrainingDto,
    @Request() req
  ) {
    const updatedTraining = await this.PersonalTrainingService.update(trainingId, dto, req.user.email);
    return fillObject(PersonalTrainingRdo, updatedTraining);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Get full information about personal training',
    summary: 'Get full information about personal training'
  })
  @Get(':trainingId')
  async getTraining(@Param('trainingId', MongoidValidationPipe) trainingId: string) {
    const existTraining = await this.PersonalTrainingService.getTraining(trainingId);
    return fillObject(PersonalTrainingRdo, existTraining);
  }
}
