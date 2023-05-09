import { fillObject } from '@fit-friends-backend/core';
import  { TrainingDiaryRdo } from './rdo/training-diary.rdo'
import { UserOrderRdo } from '../order/rdo/user-order.rdo';
import { UserRdo } from '../auth/rdo/user.rdo';
import { UserRole } from '@fit-friends-backend/shared-types';
import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { TrainingDiaryRepository } from './training-diary.repository';
import { TrainingDiaryEntity } from './training-diary.entity';
import { CreateTrainingDiaryDto } from './dto/create-training-diary.dto';
import { TrainingDiaryMessage } from './training-diary.constant';
import { UserService } from '../user/user.service';
import { OrderService } from '../order/order.service';
import dayjs from 'dayjs';
import { UpdateTrainingDiaryDto } from './dto/update-training-diary.dto';

@Injectable()
export class TrainingDiaryService {
  constructor(
    private readonly trainingDiaryRepository: TrainingDiaryRepository,
    private readonly UserService: UserService,
    private readonly orderService: OrderService,
  ) {}

  async create(dto: CreateTrainingDiaryDto, userEmail: string, orderId: string) {

    const existUser = await this.UserService.findByEmail(userEmail);

    if (!existUser) {
      throw new HttpException(TrainingDiaryMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    if (existUser.userRole === UserRole.Coach) {
      throw new HttpException(TrainingDiaryMessage.USER_ROLE_WRONG, HttpStatus.CONFLICT);
    }

    const existOrder = await this.orderService.getOrder(orderId);
    const existOrderRdo = fillObject(UserOrderRdo, existOrder);

    if (!existOrder) {
      throw new HttpException(TrainingDiaryMessage.ORDER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    if (existOrderRdo.user.id !== fillObject(UserRdo, existUser).id) {
      throw new HttpException(TrainingDiaryMessage.CREATE_TRAINING_DIARY_USER_WRONG, HttpStatus.CONFLICT);
    }

    const {caloriesSpentAmount, date} = dto;

    const trainingDiary = {
      caloriesSpentAmount, date:dayjs(date).toDate(),
      timeSpentAmount: existOrderRdo.service.time,
      training: existOrderRdo.service.id,
      user: existUser._id
    };

    const trainingDiaryEntity = await new TrainingDiaryEntity(trainingDiary);

      const createdTrainingDiary = await this.trainingDiaryRepository
      .create(trainingDiaryEntity);

    return createdTrainingDiary;
  }

  async update(trainingDiaryId: string, dto: UpdateTrainingDiaryDto, userEmail: string) {

    const existUser = await this.UserService.findByEmail(userEmail);

    if (existUser.userRole === UserRole.Coach) {
      throw new HttpException(TrainingDiaryMessage.USER_ROLE_WRONG, HttpStatus.CONFLICT);
    }

    const existTrainingDiary = await this.trainingDiaryRepository.findById(trainingDiaryId);

    if (!existTrainingDiary) {
      throw new HttpException(TrainingDiaryMessage.TRAINING_DIARY_NOT_FOUND, HttpStatus.CONFLICT);
    }

    if(fillObject(TrainingDiaryRdo, existTrainingDiary).userId.id !== fillObject(UserRdo, existUser).id) {
      throw new HttpException(TrainingDiaryMessage.UPDATE_TRAINING_DIARY_USER_WRONG, HttpStatus.CONFLICT);
    }

    const trainingDiaryEntity = Object.assign(new TrainingDiaryEntity(existTrainingDiary), dto);

    return this.trainingDiaryRepository.update(trainingDiaryId, trainingDiaryEntity);
  }

  async getTrainingDiary(id: string, userEmail: string) {

    const existUser = await this.UserService.findByEmail(userEmail);

    if (existUser.userRole === UserRole.Coach) {
      throw new HttpException(TrainingDiaryMessage.USER_ROLE_WRONG, HttpStatus.CONFLICT);
    }

    const existTrainingDiary = await this.trainingDiaryRepository.findById(id);

    if (!existTrainingDiary) {
      throw new HttpException(TrainingDiaryMessage.TRAINING_DIARY_NOT_FOUND, HttpStatus.CONFLICT);
    }

    if(fillObject(TrainingDiaryRdo, existTrainingDiary).userId.id !== fillObject(UserRdo, existUser).id) {
      throw new HttpException(TrainingDiaryMessage.GET_TRAINING_DIARY_USER_WRONG, HttpStatus.CONFLICT);
    }

    return existTrainingDiary;
  }

  async deleteTrainingDiary(id: string, userEmail: string) {

    const existUser = await this.UserService.findByEmail(userEmail);

    if (existUser.userRole === UserRole.Coach) {
      throw new HttpException(TrainingDiaryMessage.USER_ROLE_WRONG, HttpStatus.CONFLICT);
    }

    const existTrainingDiary = await this.trainingDiaryRepository.findById(id);

    if (!existTrainingDiary) {
      throw new HttpException(TrainingDiaryMessage.TRAINING_DIARY_NOT_FOUND, HttpStatus.CONFLICT);
    }

    if(fillObject(TrainingDiaryRdo, existTrainingDiary).userId.id !== fillObject(UserRdo, existUser).id) {
      throw new HttpException(TrainingDiaryMessage.DELETE_TRAINING_DIARY_USER_WRONG, HttpStatus.CONFLICT);
    }

    return this.trainingDiaryRepository.destroy(id);
  }
}
