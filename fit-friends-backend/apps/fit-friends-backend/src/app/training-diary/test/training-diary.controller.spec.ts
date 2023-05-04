import { Test } from '@nestjs/testing';
import { TrainingDiaryService } from '../training-diary.service';
import { TrainingDiaryController } from '../training-diary.controller';
import { userStub } from '../../shop-user/test/stubs/shop-user.stub';
import { TrainingDiary } from '@fit-friends-backend/shared-types';
import { CreateTrainingDiaryDto } from '../dto/create-training-diary.dto';
import { UpdateTrainingDiaryDto } from '../dto/update-training-diary.dto';

jest.mock('../training-diary.service');

describe('TrainingDiaryController', () => {
  let trainingDiaryController: TrainingDiaryController;
  let trainingDiaryService: TrainingDiaryService;

  const requestMock = {
    user: {
      email: userStub().email,
    },
    query: {},
  } as unknown as Request;

  const trainingDiaryId = '64381d761a4f882524397a5c';
  const orderId = '6443a652c8fad5d9da5cb440';

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [TrainingDiaryController],
        providers: [TrainingDiaryService],
      }).compile();

      trainingDiaryService = moduleRef.get<TrainingDiaryService>(TrainingDiaryService);
      trainingDiaryController = moduleRef.get<TrainingDiaryController>(TrainingDiaryController);
  });

  describe('CreateTrainingDiary', () => {
    it('should create training diary', async () => {
      let trainingDiary: TrainingDiary;
      const createTrainingDiaryDto: CreateTrainingDiaryDto = {
        caloriesSpentAmount: 155,
        date: "2021-10-24"
      }

      jest.spyOn(trainingDiaryService, 'create').mockImplementation(async ():Promise<TrainingDiary> => Promise.resolve(trainingDiary));

      expect(await trainingDiaryController.create(orderId, createTrainingDiaryDto, requestMock)).toEqual(trainingDiary);
    });
  });

  describe('UpdateTrainingDiary', () => {
    it('should update training diary', async () => {
      let trainingDiary: TrainingDiary;
      const updateTrainingDiaryDto: UpdateTrainingDiaryDto = {
        caloriesSpentAmount: 200
      }

      jest.spyOn(trainingDiaryService, 'update').mockImplementation(async ():Promise<TrainingDiary> => Promise.resolve(trainingDiary));

      expect(await trainingDiaryController.update(trainingDiaryId, updateTrainingDiaryDto, requestMock)).toEqual(trainingDiary);
    });
  });

  describe('GetTrainingDiary', () => {
    it('should return training diary', async () => {
      let trainingDiary: TrainingDiary;

      jest.spyOn(trainingDiaryService, 'getTrainingDiary').mockImplementation(async ():Promise<TrainingDiary> => Promise.resolve(trainingDiary));

      expect(await trainingDiaryController.getTrainingDiary(trainingDiaryId, requestMock)).toEqual(trainingDiary);
    });
  });

  describe('DeleteTrainingDiary', () => {
    it('should delete training diary', async () => {
      let trainingDiary: TrainingDiary;
      jest.spyOn(trainingDiaryService, 'deleteTrainingDiary').mockImplementation();

      expect(await trainingDiaryController.deleteTrainingDiary(trainingDiaryId, requestMock)).toEqual(trainingDiary);
    });
  });

});
