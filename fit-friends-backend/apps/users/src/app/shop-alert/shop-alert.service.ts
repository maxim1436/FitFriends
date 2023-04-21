import { fillObject } from '@fit-friends-backend/core';
import { AlertRdo } from './rdo/alert.rdo';
import { UserRdo } from '../auth/rdo/user.rdo';
import { Inject, forwardRef, Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { ShopAlertRepository } from './shop-alert.repository';
import { ShopAlertEntity } from './shop-alert.entity';
import { CreateAlertDto } from './dto/create-alert.dto';
import { AlertMessage } from './shop-alert.constant';
import { ShopUserService } from '../shop-user/shop-user.service';
import dayjs from 'dayjs';

@Injectable()
export class ShopAlertService {
  constructor(
    private readonly ShopAlertRepository: ShopAlertRepository,
    @Inject(forwardRef(() => ShopUserService))
    private readonly shopUserService: ShopUserService,
  ) {}

  async create(dto: CreateAlertDto) {
    const {createdAt, userId, alertText} = dto;

    const shopAlert = {
      createdAt: dayjs(createdAt).toDate(),
      userId: userId, alertText
    };

    const alertEntity = await new ShopAlertEntity(shopAlert);

      const createdAlert = await this.ShopAlertRepository
      .create(alertEntity);

    return createdAlert;
  }

  async getAlert(userEmail: string, alertId: string) {

    const existAlert = await this.ShopAlertRepository.findById(alertId);

    if (!existAlert) {
      throw new HttpException(AlertMessage.ALERT_NOT_FOUND, HttpStatus.CONFLICT);
    }

    if(fillObject(AlertRdo, existAlert).userId.email !== userEmail) {
      throw new HttpException(AlertMessage.GET_ALERT_USER_WRONG, HttpStatus.CONFLICT);
    }

    return existAlert;
  }

  async getSomeAlerts(userEmail: string, count?: number ) {

    const existUser = await this.shopUserService.findByEmail(userEmail);

    if (!existUser) {
      throw new HttpException(AlertMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    return this.ShopAlertRepository.findByDefault(existUser._id, count);
  }


  async deleteAlert(alertId: string, userEmail: string) {

    const existUser = await this.shopUserService.findByEmail(userEmail);

    const existAlert = await this.ShopAlertRepository.findById(alertId);

    if (!existAlert) {
      throw new HttpException(AlertMessage.ALERT_NOT_FOUND, HttpStatus.CONFLICT);
    }

    if(fillObject(AlertRdo, existAlert).userId.id !== fillObject(UserRdo, existUser).id) {
      throw new HttpException(AlertMessage.DELETE_ALERT_USER_WRONG, HttpStatus.CONFLICT);
    }

    return this.ShopAlertRepository.destroy(alertId);
  }
}
