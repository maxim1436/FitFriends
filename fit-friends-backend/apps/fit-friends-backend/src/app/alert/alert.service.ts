import { fillObject } from '@fit-friends-backend/core';
import { AlertRdo } from './rdo/alert.rdo';
import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { AlertRepository } from './alert.repository';
import { AlertEntity } from './alert.entity';
import { CreateAlertDto } from './dto/create-alert.dto';
import { AlertMessage } from './alert.constant';
import dayjs from 'dayjs';

@Injectable()
export class AlertService {
  constructor(
    private readonly AlertRepository: AlertRepository,
  ) {}

  async create(dto: CreateAlertDto) {
    const {createdAt, userId, alertText} = dto;

    const alert = {
      createdAt: dayjs(createdAt).toDate(),
      user: userId, alertText
    };

    const alertEntity = await new AlertEntity(alert);

      const createdAlert = await this.AlertRepository
      .create(alertEntity);

    return createdAlert;
  }

  async getAlert(userEmail: string, alertId: string) {

    const existAlert = await this.AlertRepository.findById(alertId);

    if (!existAlert) {
      throw new HttpException(AlertMessage.ALERT_NOT_FOUND, HttpStatus.CONFLICT);
    }

    if(fillObject(AlertRdo, existAlert).userId.email !== userEmail) {
      throw new HttpException(AlertMessage.GET_ALERT_USER_WRONG, HttpStatus.CONFLICT);
    }

    return existAlert;
  }

  async getSomeAlerts(userId: string, count?: number ) {

    return this.AlertRepository.findByDefault(userId, count);
  }


  async deleteAlert(userEmail: string, alertId: string) {

    const existAlert = await this.AlertRepository.findById(alertId);

    if (!existAlert) {
      throw new HttpException(AlertMessage.ALERT_NOT_FOUND, HttpStatus.CONFLICT);
    }

    if(fillObject(AlertRdo, existAlert).userId.email !== userEmail) {
      throw new HttpException(AlertMessage.DELETE_ALERT_USER_WRONG, HttpStatus.CONFLICT);
    }

    return await this.AlertRepository.destroy(alertId);
  }
}
