import { Test } from '@nestjs/testing';
import { PersonalTrainingService } from '../personal-training.service';
import { PersonalTrainingController } from '../personal-training.controller';
import { userStub } from '../../user/test/stubs/user.stub';
import { PersonalTraining, PersonalTrainingStatus } from '@fit-friends-backend/shared-types';
import { CreatePersonalTrainingDto } from '../dto/create-personal-training.dto';
import { UpdatePersonalTrainingDto } from '../dto/update-personal-training.dto';

jest.mock('../personal-training.service');

describe('PersonalTrainingController', () => {
  let personalTrainingController: PersonalTrainingController;
  let personalTrainingService: PersonalTrainingService;

  const requestMock = {
    user: {
      email: userStub().email,
    },
    query: {},
  } as unknown as Request;

  const personalTrainingId = '64381d761a4f882524397a5c';

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [PersonalTrainingController],
        providers: [PersonalTrainingService],
      }).compile();

      personalTrainingService = moduleRef.get<PersonalTrainingService>(PersonalTrainingService);
      personalTrainingController = moduleRef.get<PersonalTrainingController>(PersonalTrainingController);
  });

  describe('CreatePersonalTraining', () => {
    it('should create personal training', async () => {
      let personalTraining: PersonalTraining;
      const createPersonalTrainingDto: CreatePersonalTrainingDto = {
        companionId: '6443a65ec8fad5d9da5cb444',
      }

      jest.spyOn(personalTrainingService, 'create').mockImplementation(async ():Promise<PersonalTraining> => Promise.resolve(personalTraining));

      expect(await personalTrainingController.create(createPersonalTrainingDto, requestMock)).toEqual(personalTraining);
    });
  });

  describe('UpdatePersonalTraining', () => {
    it('should update personal training', async () => {
      let personalTraining: PersonalTraining;
      const updatePersonalTrainingDto: UpdatePersonalTrainingDto = {
        status: PersonalTrainingStatus.Approve,
      }

      jest.spyOn(personalTrainingService, 'update').mockImplementation(async ():Promise<PersonalTraining> => Promise.resolve(personalTraining));

      expect(await personalTrainingController.update(personalTrainingId, updatePersonalTrainingDto, requestMock)).toEqual(personalTraining);
    });
  });

  describe('GetPersonalTraining', () => {
    it('should return personal training', async () => {
      let personalTraining: PersonalTraining;

      jest.spyOn(personalTrainingService, 'getTraining').mockImplementation(async ():Promise<PersonalTraining> => Promise.resolve(personalTraining));

      expect(await personalTrainingController.getTraining(personalTrainingId)).toEqual(personalTraining);
    });
  });

});
