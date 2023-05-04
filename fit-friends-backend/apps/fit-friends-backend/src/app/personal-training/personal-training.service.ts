import { UserRole, PersonalTrainingStatus } from '@fit-friends-backend/shared-types';
import { fillObject } from '@fit-friends-backend/core';
import { PersonalTrainingRdo } from './rdo/personal-training.rdo';
import { UserRdo } from '../auth/rdo/user.rdo';
import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { PersonalTrainingRepository } from './personal-training.repository';
import { PersonalTrainingEntity } from './personal-training.entity';
import { CreatePersonalTrainingDto } from './dto/create-personal-training.dto';
import { PersonalTrainingMessage } from './personal-training.constant';
import { UpdatePersonalTrainingDto } from './dto/update-personal-training.dto';
import { ShopUserService } from '../shop-user/shop-user.service';
import dayjs from 'dayjs';

@Injectable()
export class PersonalTrainingService {
  constructor(
    private readonly PersonalTrainingRepository: PersonalTrainingRepository,
    private readonly ShopUserService: ShopUserService,
  ) {}

  async create(dto: CreatePersonalTrainingDto, coachEmail: string) {

    const existUser = await this.ShopUserService.findByEmail(coachEmail);

    if (!existUser) {
      throw new HttpException(PersonalTrainingMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    if (existUser.userRole === UserRole.Coach) {
      throw new HttpException(PersonalTrainingMessage.USER_ROLE_WRONG, HttpStatus.CONFLICT);
    }

    const {companionId} = dto;

    const personalTraining = {
      initiatorId: existUser._id, anotherUserID: companionId,
      createdAt: dayjs(new Date()).toDate(), changingStatusDate: dayjs(new Date()).toDate(),
      status: PersonalTrainingStatus.Awaiting,
    };

    const personalTrainingEntity = await new PersonalTrainingEntity(personalTraining);

      const createdTraining = await this.PersonalTrainingRepository
      .create(personalTrainingEntity);

    return createdTraining;
  }

  async update(trainingId: string, dto: UpdatePersonalTrainingDto, userEmail: string) {

    const existUser = await this.ShopUserService.findByEmail(userEmail);

    const existTraining = await this.PersonalTrainingRepository.findById(trainingId);

    if (!existTraining) {
      throw new HttpException(PersonalTrainingMessage.PERSONAL_TRAINING_NOT_FOUND, HttpStatus.CONFLICT);
    }

    if(fillObject(PersonalTrainingRdo, existTraining).initiator.id === fillObject(UserRdo, existUser).id) {
      throw new HttpException(PersonalTrainingMessage.UPDATE_PERSONAL_TRAINING_INITIATOR_WRONG, HttpStatus.CONFLICT);
    }

    if (dto.status === existTraining.status) {

      return existTraining;

    } else {

      const shopTrainingEntity = Object.assign(
        new PersonalTrainingEntity(existTraining),
       {
        status: dto.status, changingStatusDate: dayjs(new Date()).toDate()
       }
      );
      return this.PersonalTrainingRepository.update(trainingId, shopTrainingEntity);

    }


  }

  async getTraining(id: string) {
    const existTraining = await this.PersonalTrainingRepository.findById(id);

    if (!existTraining) {
      throw new HttpException(PersonalTrainingMessage.PERSONAL_TRAINING_NOT_FOUND, HttpStatus.CONFLICT);
    }
    return existTraining;
  }

}
