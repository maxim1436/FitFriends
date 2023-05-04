import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
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

    const gymsArray = await this.GymRepository.findByDefault();

    if(gymsArray.length === 0) {
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

        await this.GymRepository.create(gymEntity);
      }
    }
  }

  async getFavoriteGyms(gymsIdArray: string[]) {

    return await this.GymRepository.findFavoriteGyms(gymsIdArray);
  }

  async getSomeGyms(count?: number) {
    return await this.GymRepository.findByDefault(count);
  }

  async getGym(id: string) {

    const existGym = await this.GymRepository.findById(id);

    if (!existGym) {
      throw new HttpException(GymMessage.GYM_NOT_FOUND, HttpStatus.CONFLICT);
    }

    return existGym;
  }

}
