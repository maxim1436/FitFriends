import { Test } from '@nestjs/testing';
import { TrainingService } from '../training.service';
import { TrainingController } from '../training.controller';
import { userStub } from '../../user/test/stubs/user.stub';
import { Training } from '@fit-friends-backend/shared-types';
import { CreateTrainingDto } from '../dto/create-training.dto';
import { UpdateTrainingDto } from '../dto/update-training.dto';
import { FilterTrainingDto } from '../dto/filter-training.dto';

jest.mock('../training.service');

describe('TrainingController', () => {
  let trainingController: TrainingController;
  let trainingService: TrainingService;

  const requestMock = {
    user: {
      email: userStub().email,
    },
    query: {},
  } as unknown as Request;

  const trainingId = '644947bf7f40d82e97b654ec';

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [TrainingController],
        providers: [TrainingService],
      }).compile();

      trainingService = moduleRef.get<TrainingService>(TrainingService);
      trainingController = moduleRef.get<TrainingController>(TrainingController);
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

      jest.spyOn(trainingService, 'create').mockImplementation(async ():Promise<Training> => Promise.resolve(training));

      expect(await trainingController.create(createTrainingDto, requestMock)).toEqual(training);
    });
  });

  describe('UpdateTraining', () => {
    it('should update training', async () => {
      let training: Training;
      const updateTrainingDto: UpdateTrainingDto = {
        title: "Тренировка12",
      }

      jest.spyOn(trainingService, 'update').mockImplementation(async ():Promise<Training> => Promise.resolve(training));

      expect(await trainingController.update(trainingId, updateTrainingDto, requestMock)).toEqual(training);
    });
  });

  describe('GetTraining', () => {
    it('should return training', async () => {
      let training: Training;

      jest.spyOn(trainingService, 'getTraining').mockImplementation(async ():Promise<Training> => Promise.resolve(training));

      expect(await trainingController.getTraining(trainingId)).toEqual(training);
    });
  });

  describe('GetTrainings', () => {
    it('should return some trainings', async () => {
      let training: Training[];
      const filterTrainingDto: FilterTrainingDto = {};

      jest.spyOn(trainingService, 'getSomeTrainings').mockImplementation(async ():Promise<Training[]> => Promise.resolve(training));

      expect(await trainingController.showTrainings(requestMock, filterTrainingDto, requestMock)).toEqual(training);
    });
  });

});
