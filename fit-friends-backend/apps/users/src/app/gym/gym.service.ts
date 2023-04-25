import { UserRole, CommandEvent } from '@fit-friends-backend/shared-types';
import { fillObject } from '@fit-friends-backend/core';
import { UserRdo } from '../auth/rdo/user.rdo';
import { Inject, Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { GymRepository } from './gym.repository';
import { GymEntity } from './gym.entity';
import { GymMessage } from './gym.constant';
import { getRandomElementOfArray, getRandomInteger } from '../utils/utils';
import { GYM_TITLE, GYM_LOCATION, GYM_PARAMETERS, GYM_PHOTOS, GYM_DESCRIPTION, GYM_VERIFY } from './mocks/mock-gym-data';
import dayjs from 'dayjs';

const MAX_PRICE = 5000;
const LOW_PRICE = 100;

@Injectable()
export class GymService {
  constructor(
    private readonly GymRepository: GymRepository,
  ) {
    this.create();
  }

  private async create() {
    for(let i = 0; i < 5; i++) {

      const gym = {
        title: getRandomElementOfArray(GYM_TITLE),
        location: getRandomElementOfArray(GYM_LOCATION),
        verify: getRandomElementOfArray(GYM_VERIFY),
        parameters: getRandomElementOfArray(GYM_PARAMETERS),
        photos: getRandomElementOfArray(GYM_PHOTOS),
        description: getRandomElementOfArray(GYM_DESCRIPTION),
        price: getRandomInteger(LOW_PRICE, MAX_PRICE),
        dateBirth: dayjs(new Date()).toDate(),
      };

      const gymEntity = await new GymEntity(gym);

      const createdGym = await this.GymRepository.create(gymEntity);
    }
  }

  async getTraining(id: string) {
    const existTraining = await this.GymRepository.findById(id);

    if (!existTraining) {
      throw new HttpException(GymMessage.GYM_NOT_FOUND, HttpStatus.CONFLICT);
    }
    return existTraining;
  }

}
