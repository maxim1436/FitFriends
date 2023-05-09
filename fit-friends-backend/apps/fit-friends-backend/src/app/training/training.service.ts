import { UserRole, CommandEvent } from '@fit-friends-backend/shared-types';
import { fillObject } from '@fit-friends-backend/core';
import { TrainingRdo } from './rdo/training.rdo';
import { UserRdo } from '../auth/rdo/user.rdo';
import { Inject, Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { TrainingRepository } from './training.repository';
import { TrainingEntity } from './training.entity';
import { CreateTrainingDto } from './dto/create-training.dto';
import { TrainingMessage} from './training.constant';
import { RABBITMQ_SERVICE } from '../user/user.constant';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { FilterTrainingDto } from './dto/filter-training.dto';
import { UserService } from '../user/user.service';
import { ClientProxy } from '@nestjs/microservices';
import { EmailSubscriberService } from '../email-subscriber/email-subscriber.service';
import { TRAINING_TITLE, TRAINING_PREVIEW, TRAINING_LEVEL, TRAINING_TYPE, TRAINING_DESCRIPTION,
TRAINING_GENDER, TRAINING_VIDEO, TRAINING_SPECIAL } from './mocks/mock-training-data';
import { getRandomElementOfArray, getRandomInteger } from '../utils/utils';
import { AuthService } from '../auth/auth.service';

const LOW_PRICE = 0;
const MAX_PRICE = 1000000;
const LOW_CALORIES = 1000;
const MAX_CALORIES = 5000;
const TRAINING_RATING = [0, 1, 2, 3, 4, 5];
const TRAINING_TIME = ['10-30 мин', '30-50 мин', '50-80 мин', 'больше 80 мин'];

@Injectable()
export class TrainingService {
  constructor(
    private readonly trainingRepository: TrainingRepository,
    private readonly userService: UserService,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
    private readonly EmailSubscriberService: EmailSubscriberService,
    private readonly AuthService: AuthService,
  ) {
    this.DbFillTrainings();
  }

  async DbFillTrainings() {

    const trainingsArray = await this.trainingRepository.findByDefault();
    const coachesArray = await this.userService.findMockCoaches();

    if(trainingsArray.length === 0 && coachesArray.length === 0) {
      for(let i = 0; i < 3; i++) {
        const coach = await this.AuthService.DbFillCoaches(i);
        for(let j = 0; j < 2; j++) {
          const shopTraining = {
            title: getRandomElementOfArray(TRAINING_TITLE),
            preview: getRandomElementOfArray(TRAINING_PREVIEW),
            level: getRandomElementOfArray(TRAINING_LEVEL),
            type: getRandomElementOfArray(TRAINING_TYPE),
            time: getRandomElementOfArray(TRAINING_TIME),
            price: getRandomInteger(LOW_PRICE, MAX_PRICE),
            calories: getRandomInteger(LOW_CALORIES, MAX_CALORIES),
            description: TRAINING_DESCRIPTION,
            gender: getRandomElementOfArray(TRAINING_GENDER),
            videoLink: TRAINING_VIDEO,
            rating: 0,
            special: getRandomElementOfArray(TRAINING_SPECIAL),
            coach: coach._id
          };

          const trainingEntity = await new TrainingEntity(shopTraining);

          await this.trainingRepository
            .create(trainingEntity);
        }

      }
    }
  }

  async create(dto: CreateTrainingDto, coachEmail: string) {

    const existUser = await this.userService.findByEmail(coachEmail);

    if (!existUser) {
      throw new HttpException(TrainingMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    if (existUser.userRole === UserRole.User) {
      throw new HttpException(TrainingMessage.USER_ROLE_WRONG, HttpStatus.CONFLICT);
    }

    const {title, preview, level, type, time,
    price, calories, description, gender,
    videoLink, rating, special} = dto;

    const shopTraining = {
      title, preview, level, type, time,
      price, calories, description, gender,
      videoLink, rating, special, coach: existUser._id
    };

    const trainingEntity = await new TrainingEntity(shopTraining);

      const createdTraining = await this.trainingRepository
      .create(trainingEntity);

    this.rabbitClient.emit(
      { cmd: CommandEvent.addTraining },
      this.EmailSubscriberService.sendNotify(existUser.email)
    );

    return createdTraining;
  }

  async update(trainingId: string, dto: UpdateTrainingDto, coachEmail: string) {

    const existUser = await this.userService.findByEmail(coachEmail);

    if (existUser.userRole === UserRole.User) {
      throw new HttpException(TrainingMessage.USER_ROLE_WRONG, HttpStatus.CONFLICT);
    }

    const existTraining = await this.trainingRepository.findById(trainingId);

    if (!existTraining) {
      throw new HttpException(TrainingMessage.TRAINING_NOT_FOUND, HttpStatus.CONFLICT);
    }

    if(fillObject(TrainingRdo, existTraining).coachId.id !== fillObject(UserRdo, existUser).id) {
      throw new HttpException(TrainingMessage.UPDATE_TRAINING_USER_WRONG, HttpStatus.CONFLICT);
    }

    const shopTrainingEntity = Object.assign(new TrainingEntity(existTraining), dto);

    return this.trainingRepository.update(trainingId, shopTrainingEntity);
  }

  async getTraining(id: string) {
    const existTraining = await this.trainingRepository.findById(id);

    if (!existTraining) {
      throw new HttpException(TrainingMessage.TRAINING_NOT_FOUND, HttpStatus.CONFLICT);
    }
    return existTraining;
  }

  async getSomeTrainings(coachEmail: string, dto: FilterTrainingDto, count?: number ) {

    const existUser = await this.userService.findByEmail(coachEmail);

    if (existUser.userRole === UserRole.User) {
      throw new HttpException(TrainingMessage.USER_ROLE_WRONG, HttpStatus.CONFLICT);
    }

    const filterData = Object.assign({
        lowPrice: LOW_PRICE, maxPrice: MAX_PRICE,
        lowCalories: LOW_CALORIES, maxCalories: MAX_CALORIES, rating: TRAINING_RATING,
        time: TRAINING_TIME
      }, dto)

    return this.trainingRepository.findByFilters(existUser._id, filterData, count);
  }
}
