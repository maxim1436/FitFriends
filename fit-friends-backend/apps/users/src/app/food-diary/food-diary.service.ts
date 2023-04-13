import { fillObject } from '@fit-friends-backend/core';
import { FoodDiaryRdo } from './rdo/food-diary.rdo';
import { UserRdo } from '../auth/rdo/user.rdo';
import { UserRole, TypeOfEating } from '@fit-friends-backend/shared-types';
import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { FoodDiaryRepository } from './food-diary.repository';
import { FoodDiaryEntity } from './food-diary.entity';
import { CreateFoodDiaryDto } from './dto/create-food-diary';
import { FoodDiaryMessage } from './food-diary.constant';
import { UpdateFoodDiaryDto } from './dto/update-food-diary';
import { ShopUserService } from '../shop-user/shop-user.service';
import dayjs from 'dayjs';

const TYPE_OF_EATING_BREAKFAST = 'завтрак';
const TYPE_OF_EATING_DINNER = 'обед';
const TYPE_OF_EATING_SUPPER = 'ужин';
const TYPE_OF_EATING_SNACKING = 'перекус';

@Injectable()
export class FoodDiaryService {
  constructor(
    private readonly foodDiaryRepository: FoodDiaryRepository,
    private readonly ShopUserService: ShopUserService,
  ) {}

  private convertDtoTypeOfEatingToEnum(typeOfEating: string) {
    switch(typeOfEating) {
      case TYPE_OF_EATING_BREAKFAST:
        return TypeOfEating.Breakfast;
      case TYPE_OF_EATING_DINNER:
        return TypeOfEating.Dinner;
      case TYPE_OF_EATING_SUPPER:
        return TypeOfEating.Supper;
      case TYPE_OF_EATING_SNACKING:
        return TypeOfEating.Snacking;
      default:
        throw new HttpException(FoodDiaryMessage.TYPE_OF_EATING_CANNOT_READ, HttpStatus.CONFLICT);
    }
  }

  async create(dto: CreateFoodDiaryDto, userEmail: string) {

    const existUser = await this.ShopUserService.findByEmail(userEmail);

    if (!existUser) {
      throw new HttpException(FoodDiaryMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    if (existUser.userRole === UserRole.Coach) {
      throw new HttpException(FoodDiaryMessage.USER_ROLE_WRONG, HttpStatus.CONFLICT);
    }

    const {caloriesAmount, date, typeOfEating} = dto;

    const foodDiary = {
      caloriesAmount, date:dayjs(date).toDate(),
      typeOfEating: this.convertDtoTypeOfEatingToEnum(typeOfEating),
      user: existUser._id
    };

    const foodDiaryEntity = await new FoodDiaryEntity(foodDiary);

      const createdFoodDiary = await this.foodDiaryRepository
      .create(foodDiaryEntity);

    return createdFoodDiary;
  }

  async update(foodDiaryId: string, dto: UpdateFoodDiaryDto, userEmail: string) {

    const existUser = await this.ShopUserService.findByEmail(userEmail);

    if (existUser.userRole === UserRole.Coach) {
      throw new HttpException(FoodDiaryMessage.USER_ROLE_WRONG, HttpStatus.CONFLICT);
    }

    const existFoodDiary = await this.foodDiaryRepository.findById(foodDiaryId);

    if (!existFoodDiary) {
      throw new HttpException(FoodDiaryMessage.FOOD_DIARY_NOT_FOUND, HttpStatus.CONFLICT);
    }

    if(fillObject(FoodDiaryRdo, existFoodDiary).userId.id !== fillObject(UserRdo, existUser).id) {
      throw new HttpException(FoodDiaryMessage.UPDATE_FOOD_DIARY_USER_WRONG, HttpStatus.CONFLICT);
    }

    const foodDiaryEntity = Object.assign(new FoodDiaryEntity(existFoodDiary), dto);

    return this.foodDiaryRepository.update(foodDiaryId, foodDiaryEntity);
  }

  async getFoodDiary(id: string, userEmail: string) {

    const existUser = await this.ShopUserService.findByEmail(userEmail);

    if (existUser.userRole === UserRole.Coach) {
      throw new HttpException(FoodDiaryMessage.USER_ROLE_WRONG, HttpStatus.CONFLICT);
    }

    const existFoodDiary = await this.foodDiaryRepository.findById(id);

    if (!existFoodDiary) {
      throw new HttpException(FoodDiaryMessage.FOOD_DIARY_NOT_FOUND, HttpStatus.CONFLICT);
    }

    if(fillObject(FoodDiaryRdo, existFoodDiary).userId.id !== fillObject(UserRdo, existUser).id) {
      throw new HttpException(FoodDiaryMessage.GET_FOOD_DIARY_USER_WRONG, HttpStatus.CONFLICT);
    }

    return existFoodDiary;
  }

  async deleteFoodDiary(id: string, userEmail: string) {

    const existUser = await this.ShopUserService.findByEmail(userEmail);

    if (existUser.userRole === UserRole.Coach) {
      throw new HttpException(FoodDiaryMessage.USER_ROLE_WRONG, HttpStatus.CONFLICT);
    }

    const existFoodDiary = await this.foodDiaryRepository.findById(id);

    if (!existFoodDiary) {
      throw new HttpException(FoodDiaryMessage.FOOD_DIARY_NOT_FOUND, HttpStatus.CONFLICT);
    }

    if(fillObject(FoodDiaryRdo, existFoodDiary).userId.id !== fillObject(UserRdo, existUser).id) {
      throw new HttpException(FoodDiaryMessage.DELETE_FOOD_DIARY_USER_WRONG, HttpStatus.CONFLICT);
    }

    return this.foodDiaryRepository.destroy(id);
  }
}
