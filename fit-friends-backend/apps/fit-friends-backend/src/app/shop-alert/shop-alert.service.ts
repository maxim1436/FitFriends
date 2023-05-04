import { fillObject } from '@fit-friends-backend/core';
import { AlertRdo } from './rdo/alert.rdo';
import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { ShopAlertRepository } from './shop-alert.repository';
import { ShopAlertEntity } from './shop-alert.entity';
import { CreateAlertDto } from './dto/create-alert.dto';
import { AlertMessage } from './shop-alert.constant';
import dayjs from 'dayjs';

@Injectable()
export class ShopAlertService {
  constructor(
    private readonly ShopAlertRepository: ShopAlertRepository,
  ) {}

  async create(dto: CreateAlertDto) {
    const {createdAt, userId, alertText} = dto;

    const shopAlert = {
      createdAt: dayjs(createdAt).toDate(),
      user: userId, alertText
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

  async getSomeAlerts(userId: string, count?: number ) {

    return this.ShopAlertRepository.findByDefault(userId, count);
  }


  async deleteAlert(userEmail: string, alertId: string) {

    const existAlert = await this.ShopAlertRepository.findById(alertId);

    if (!existAlert) {
      throw new HttpException(AlertMessage.ALERT_NOT_FOUND, HttpStatus.CONFLICT);
    }

    if(fillObject(AlertRdo, existAlert).userId.email !== userEmail) {
      throw new HttpException(AlertMessage.DELETE_ALERT_USER_WRONG, HttpStatus.CONFLICT);
    }

    return await this.ShopAlertRepository.destroy(alertId);
  }
}
