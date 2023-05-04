import { Body, Controller, Post, Get, Param, UseGuards, Patch, Request, Delete } from '@nestjs/common';
import { fillObject } from '@fit-friends-backend/core';
import { FoodDiaryRdo } from './rdo/food-diary.rdo';
import { FoodDiaryService } from './food-diary.service';
import { CreateFoodDiaryDto } from './dto/create-food-diary.dto';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateFoodDiaryDto } from './dto/update-food-diary.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger/dist';

@ApiTags('food diary')
@Controller('food-diary')
export class FoodDiaryController {
  constructor(
    private readonly FoodDiaryService: FoodDiaryService
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Create new food diary',
    summary: 'Create new food diary'
  })
  @Post('create')
  async create(
    @Body() dto: CreateFoodDiaryDto,
    @Request() req
  ) {
    const newFoodDiary = await this.FoodDiaryService.create(dto, req.user.email);
    return fillObject(FoodDiaryRdo, newFoodDiary);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Update food diary',
    summary: 'Update food diary'
  })
  @Patch(':foodDiaryId')
  async update(
    @Param('foodDiaryId', MongoidValidationPipe) foodDiaryId: string,
    @Body() dto: UpdateFoodDiaryDto,
    @Request() req
  ) {
    const updatedFoodDiary = await this.FoodDiaryService.update(foodDiaryId, dto, req.user.email);
    return fillObject(FoodDiaryRdo, updatedFoodDiary);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Get full information about food diary',
    summary: 'Get full information about food diary'
  })
  @Get(':foodDiaryId')
  async getFoodDiary(
    @Param('foodDiaryId', MongoidValidationPipe) foodDiaryId: string,
    @Request() req
    ) {
    const existFoodDiary = await this.FoodDiaryService.getFoodDiary(foodDiaryId, req.user.email);
    return fillObject(FoodDiaryRdo, existFoodDiary);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Delete food diary',
    summary: 'Delete food diary'
  })
  @Delete(':foodDiaryId')
  async deleteFoodDiary(
    @Param('foodDiaryId', MongoidValidationPipe) foodDiaryId: string,
    @Request() req
    ) {
    const deletedFoodDiary = await this.FoodDiaryService.deleteFoodDiary(foodDiaryId, req.user.email);
    return deletedFoodDiary;
  }
}

