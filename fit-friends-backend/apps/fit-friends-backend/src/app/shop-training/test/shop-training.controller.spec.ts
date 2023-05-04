import { Test } from '@nestjs/testing';
import { ShopTrainingService } from '../shop-training.service';
import { ShopTrainingController } from '../shop-training.controller';
import { userStub } from '../../shop-user/test/stubs/shop-user.stub';
import { Training } from '@fit-friends-backend/shared-types';
import { CreateTrainingDto } from '../dto/create-training.dto';
import { UpdateTrainingDto } from '../dto/update-training.dto';
import { FilterTrainingDto } from '../dto/filter-training.dto';

jest.mock('../shop-training.service');

describe('ShopTrainingController', () => {
  let shopTrainingController: ShopTrainingController;
  let shopTrainingService: ShopTrainingService;

  const requestMock = {
    user: {
      email: userStub().email,
    },
    query: {},
  } as unknown as Request;

  const trainingId = '644947bf7f40d82e97b654ec';

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [ShopTrainingController],
        providers: [ShopTrainingService],
      }).compile();

      shopTrainingService = moduleRef.get<ShopTrainingService>(ShopTrainingService);
      shopTrainingController = moduleRef.get<ShopTrainingController>(ShopTrainingController);
  });

  describe('CreateTraining', () => {
    it('should create training', async () => {
      let training: Training;
      const createTrainingDto: CreateTrainingDto = {

        title: "Тренировка",
        preview: "12313",
        level: "новичок",
        type: "бег",
        time: "больше 80 мин",
        price: 400,
        calories: 2000,
        description: "Приходите, не пожалеете!",
        gender: "для всех",
        videoLink: "12312311",
        rating: 3,
        special: true
      }

      jest.spyOn(shopTrainingService, 'create').mockImplementation(async ():Promise<Training> => Promise.resolve(training));

      expect(await shopTrainingController.create(createTrainingDto, requestMock)).toEqual(training);
    });
  });

  describe('UpdateTraining', () => {
    it('should update training', async () => {
      let training: Training;
      const updateTrainingDto: UpdateTrainingDto = {
        title: "Тренировка12",
      }

      jest.spyOn(shopTrainingService, 'update').mockImplementation(async ():Promise<Training> => Promise.resolve(training));

      expect(await shopTrainingController.update(trainingId, updateTrainingDto, requestMock)).toEqual(training);
    });
  });

  describe('GetTraining', () => {
    it('should return training', async () => {
      let training: Training;

      jest.spyOn(shopTrainingService, 'getTraining').mockImplementation(async ():Promise<Training> => Promise.resolve(training));

      expect(await shopTrainingController.getTraining(trainingId)).toEqual(training);
    });
  });

  describe('GetTrainings', () => {
    it('should return some trainings', async () => {
      let training: Training[];
      const filterTrainingDto: FilterTrainingDto = {};

      jest.spyOn(shopTrainingService, 'getSomeTrainings').mockImplementation(async ():Promise<Training[]> => Promise.resolve(training));

      expect(await shopTrainingController.showTrainings(requestMock, filterTrainingDto, requestMock)).toEqual(training);
    });
  });

});
