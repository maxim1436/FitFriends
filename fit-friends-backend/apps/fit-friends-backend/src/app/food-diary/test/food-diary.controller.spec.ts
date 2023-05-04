import { Test } from '@nestjs/testing';
import { FoodDiaryService } from '../food-diary.service';
import { FoodDiaryController } from '../food-diary.controller';
import { userStub } from '../../shop-user/test/stubs/shop-user.stub';
import { FoodDiary } from '@fit-friends-backend/shared-types';
import { CreateFoodDiaryDto } from '../dto/create-food-diary.dto';
import { UpdateFoodDiaryDto } from '../dto/update-food-diary.dto';

jest.mock('../food-diary.service');

describe('FoodDiaryController', () => {
  let foodDiaryController: FoodDiaryController;
  let foodDiaryService: FoodDiaryService;

  const requestMock = {
    user: {
      email: userStub().email,
    },
    query: {},
  } as unknown as Request;

  const foodDiaryId = '64381d761a4f882524397a5c';

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [FoodDiaryController],
        providers: [FoodDiaryService],
      }).compile();

      foodDiaryService = moduleRef.get<FoodDiaryService>(FoodDiaryService);
      foodDiaryController = moduleRef.get<FoodDiaryController>(FoodDiaryController);
  });

  describe('CreateFoodDiary', () => {
    it('should create food diary', async () => {
      let foodDiary: FoodDiary;
      const createFoodDiaryDto: CreateFoodDiaryDto = {
        caloriesAmount: 155,
        date: "2021-10-24",
        typeOfEating: "перекус"
      }

      jest.spyOn(foodDiaryService, 'create').mockImplementation(async ():Promise<FoodDiary> => Promise.resolve(foodDiary));

      expect(await foodDiaryController.create(createFoodDiaryDto, requestMock)).toEqual(foodDiary);
    });
  });

  describe('UpdateFoodDiary', () => {
    it('should update food diary', async () => {
      let foodDiary: FoodDiary;
      const updateFoodDiaryDto: UpdateFoodDiaryDto = {
        caloriesAmount: 200
      }

      jest.spyOn(foodDiaryService, 'update').mockImplementation(async ():Promise<FoodDiary> => Promise.resolve(foodDiary));

      expect(await foodDiaryController.update(foodDiaryId, updateFoodDiaryDto, requestMock)).toEqual(foodDiary);
    });
  });

  describe('GetFoodDiary', () => {
    it('should return food diary', async () => {
      let foodDiary: FoodDiary;

      jest.spyOn(foodDiaryService, 'getFoodDiary').mockImplementation(async ():Promise<FoodDiary> => Promise.resolve(foodDiary));

      expect(await foodDiaryController.getFoodDiary(foodDiaryId, requestMock)).toEqual(foodDiary);
    });
  });

  describe('DeleteFoodDiary', () => {
    it('should delete food diary', async () => {
      let foodDiary: FoodDiary;
      jest.spyOn(foodDiaryService, 'deleteFoodDiary').mockImplementation();

      expect(await foodDiaryController.deleteFoodDiary(foodDiaryId, requestMock)).toEqual(foodDiary);
    });
  });

});
