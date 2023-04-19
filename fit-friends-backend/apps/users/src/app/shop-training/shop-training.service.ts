import { UserRole, CommandEvent } from '@fit-friends-backend/shared-types';
import { fillObject } from '@fit-friends-backend/core';
import { TrainingRdo } from './rdo/training.rdo';
import { UserRdo } from '../auth/rdo/user.rdo';
import { Inject, Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { ShopTrainingRepository } from './shop-training.repository';
import { ShopTrainingEntity } from '../shop-training/shop-training.entity';
import { CreateTrainingDto } from './dto/create-training.dto';
import { TrainingMessage} from './shop-training.constant';
import { RABBITMQ_SERVICE } from '../shop-user/shop-user.constant';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { FilterTrainingDto } from './dto/filter-training.dto';
import { ShopUserService } from '../shop-user/shop-user.service';
import { ClientProxy } from '@nestjs/microservices';
import { EmailSubscriberService } from '../email-subscriber/email-subscriber.service';

const LOW_PRICE = 0;
const MAX_PRICE = 1000000;
const LOW_CALORIES = 1000;
const MAX_CALORIES = 5000;
const TRAINING_RATING = [0, 1, 2, 3, 4, 5];
const TRAINING_TIME = ['10-30 мин', '30-50 мин', '50-80 мин', 'больше 80 мин'];

@Injectable()
export class ShopTrainingService {
  constructor(
    private readonly ShopTrainingRepository: ShopTrainingRepository,
    private readonly ShopUserService: ShopUserService,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
    private readonly EmailSubscriberService: EmailSubscriberService,
  ) {}

  async create(dto: CreateTrainingDto, coachEmail: string) {

    const existUser = await this.ShopUserService.findByEmail(coachEmail);

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

    const trainingEntity = await new ShopTrainingEntity(shopTraining);

      const createdTraining = await this.ShopTrainingRepository
      .create(trainingEntity);

    this.rabbitClient.emit(
      { cmd: CommandEvent.addTraining },
      this.EmailSubscriberService.sendNotify(existUser.email)
    );

    return createdTraining;
  }

  async update(trainingId: string, dto: UpdateTrainingDto, coachEmail: string) {

    const existUser = await this.ShopUserService.findByEmail(coachEmail);

    if (existUser.userRole === UserRole.User) {
      throw new HttpException(TrainingMessage.USER_ROLE_WRONG, HttpStatus.CONFLICT);
    }

    const existTraining = await this.ShopTrainingRepository.findById(trainingId);

    if (!existTraining) {
      throw new HttpException(TrainingMessage.TRAINING_NOT_FOUND, HttpStatus.CONFLICT);
    }

    if(fillObject(TrainingRdo, existTraining).coachId.id !== fillObject(UserRdo, existUser).id) {
      throw new HttpException(TrainingMessage.UPDATE_TRAINING_USER_WRONG, HttpStatus.CONFLICT);
    }

    const shopTrainingEntity = Object.assign(new ShopTrainingEntity(existTraining), dto);

    return this.ShopTrainingRepository.update(trainingId, shopTrainingEntity);
  }

  async getTraining(id: string) {
    const existTraining = await this.ShopTrainingRepository.findById(id);

    if (!existTraining) {
      throw new HttpException(TrainingMessage.TRAINING_NOT_FOUND, HttpStatus.CONFLICT);
    }
    return existTraining;
  }

  async getSomeTrainings(coachEmail: string, dto: FilterTrainingDto, count?: number ) {

    const existUser = await this.ShopUserService.findByEmail(coachEmail);

    if (existUser.userRole === UserRole.User) {
      throw new HttpException(TrainingMessage.USER_ROLE_WRONG, HttpStatus.CONFLICT);
    }

    const filterData = Object.assign({
        lowPrice: LOW_PRICE, maxPrice: MAX_PRICE,
        lowCalories: LOW_CALORIES, maxCalories: MAX_CALORIES, rating: TRAINING_RATING,
        time: TRAINING_TIME
      }, dto)

    return this.ShopTrainingRepository.findByFilters(existUser._id, filterData, count);
  }
}
