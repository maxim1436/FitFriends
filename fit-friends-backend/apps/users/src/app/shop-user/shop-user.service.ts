import { Inject, forwardRef, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { fillObject } from '@fit-friends-backend/core';
import { UserRdo } from '../auth/rdo/user.rdo';
import { UpdateUserBalanceDto } from '../auth/dto/update-user-balance.dto';
import { ShopUserRepository } from '../shop-user/shop-user.repository';
import { ShopUserEntity } from '../shop-user/shop-user.entity';
import { UserRole, User, CommandEvent } from '@fit-friends-backend/shared-types';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { UserMessage, RABBITMQ_SERVICE   } from './shop-user.constant';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { EmailSubscriberService } from '../email-subscriber/email-subscriber.service';
import { ShopAlertService } from '../shop-alert/shop-alert.service';
import dayjs from 'dayjs';

const FRIEND_LIST_UPDATE_TYPE_ADD = 'add';
const FRIEND_LIST_UPDATE_TYPE_DELETE = 'delete';

const USER_BALANCE_UPDATE_TYPE_INC = 'inc';
const USER_BALANCE_UPDATE_TYPE_DEC = 'dec';
const USER_BALANCE_UPDATE_TYPE_LINK = 'link';

@Injectable()
export class ShopUserService {
  constructor(
    private readonly shopUserRepository: ShopUserRepository,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
    private readonly EmailSubscriberService: EmailSubscriberService,
    private readonly ShopAlertService: ShopAlertService,
  ) {}

  async getUser(id: string) {

    const existUser = await this.shopUserRepository.findById(id);

    if (!existUser) {
      throw new HttpException(UserMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    return existUser;
  }

  async addSubscriber(email: string, coachId: string) {
    const existUser = await this.shopUserRepository.findByEmail(email);

    const existCoach = await this.shopUserRepository.findById(coachId);

    if (!existCoach) {
      throw new HttpException(UserMessage.COACH_NOT_FOUND, HttpStatus.CONFLICT);
    }

    if (!existUser) {
      throw new HttpException(UserMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    await this.rabbitClient.emit(
      { cmd: CommandEvent.AddSubscriber },
      this.EmailSubscriberService.addSubscriber({
        email: existUser.email,
        coachEmail: [existCoach.email],
        userId: existUser._id.toString(),
      })
    );

    return existUser;
  }

  async findByEmail(email: string) {

    const existUser = await this.shopUserRepository.findByEmail(email);

    if (!existUser) {
      throw new HttpException(UserMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    return existUser;
  }

  async updateUserBalance(email: string, dto: UpdateUserBalanceDto, updateType?: string) {
    const {training, availableTrainingsAmount, seasonTicket, availableSeasonTicketsAmount} = dto;
    const existUser = await this.shopUserRepository.findByEmail(email);

    if (!existUser) {
      throw new HttpException(UserMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    if (existUser.userRole === UserRole.Coach) {
      throw new HttpException(UserMessage.USER_ROLE_WRONG, HttpStatus.CONFLICT);
    }

    switch(updateType) {
      case USER_BALANCE_UPDATE_TYPE_INC:
        {
          if(availableTrainingsAmount && existUser.userBalance.training.length) {
            existUser.userBalance.availableTrainingsAmount =+ availableTrainingsAmount;
          } else if(availableSeasonTicketsAmount && existUser.userBalance.seasonTicket.length) {
            existUser.userBalance.availableSeasonTicketsAmount =+ availableSeasonTicketsAmount;
          } else {
            throw new HttpException(UserMessage.USER_BALANCE_UPDATE_LINK_WRONG, HttpStatus.CONFLICT);
          }
        };
        break;
      case USER_BALANCE_UPDATE_TYPE_DEC:
        {
          if(availableTrainingsAmount && existUser.userBalance.training.length) {
            existUser.userBalance.availableTrainingsAmount =- availableTrainingsAmount;
          } else if(availableSeasonTicketsAmount && existUser.userBalance.seasonTicket.length) {
            existUser.userBalance.availableSeasonTicketsAmount =- availableSeasonTicketsAmount;
          } else {
            throw new HttpException(UserMessage.USER_BALANCE_UPDATE_LINK_WRONG, HttpStatus.CONFLICT);
          }
        };
        break;
      case USER_BALANCE_UPDATE_TYPE_LINK:
        {
          if(training) {
            existUser.userBalance.training = training;
            existUser.userBalance.availableTrainingsAmount = 0;
          } else {
            existUser.userBalance.seasonTicket = seasonTicket;
            existUser.userBalance.availableSeasonTicketsAmount = 0;
          }
        };
        break;
      default:
        throw new HttpException(UserMessage.UNKNOWN_USER_BALANCE_UPDATE_TYPE, HttpStatus.CONFLICT);
    }

    const shopUserEntity = new ShopUserEntity(existUser);
    return this.shopUserRepository.update(existUser._id, shopUserEntity);

  }

  async updateUser(dto: UpdateUserDto, email: string) {

    const existUser = await this.shopUserRepository.findByEmail(email);

    if (dto.favoriteGym) {
      const gymIndex = existUser.favoriteGyms.indexOf(dto.favoriteGym);

      if(gymIndex === -1) {
        existUser.favoriteGyms.push(dto.favoriteGym);

      } else {
        existUser.favoriteGyms.splice(gymIndex, 1);
      }
      delete dto.favoriteGym;
    }

    const shopUserEntity = Object.assign(new ShopUserEntity(existUser), dto);
    return this.shopUserRepository.update(existUser._id, shopUserEntity);
  }

  async getFriends(id: string, email: string) {

    const existUser = await this.shopUserRepository.findById(id);

    if (!existUser) {
      throw new HttpException(UserMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    if(existUser.email !== email) {
      throw new HttpException(UserMessage.GET_FRIENDS_USER_WRONG, HttpStatus.CONFLICT);
    }

    return this.shopUserRepository.findFriends(existUser.friends);
  }

  async getUsers( email:string, count?: number) {

    const existUser = await this.shopUserRepository.findByEmail(email);

    if (!existUser) {
      throw new HttpException(UserMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    if (existUser.userRole === UserRole.Coach) {
      throw new HttpException(UserMessage.USER_ROLE_WRONG, HttpStatus.CONFLICT);
    }

    return this.shopUserRepository.findByDefault(count);
  }

  async updateFriendsList(email: string, shoosenUserId: string, updateType?: string) {

    const existUser = await this.shopUserRepository.findByEmail(email);

    if (!existUser) {
      throw new HttpException(UserMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    const possibleFriend = await this.shopUserRepository.findById(shoosenUserId);

    if (!possibleFriend) {
      throw new HttpException(UserMessage.POSSIBLE_FRIEND_NOT_FOUND, HttpStatus.CONFLICT);
    }

    switch(updateType) {
      case FRIEND_LIST_UPDATE_TYPE_ADD:
        {
          if (existUser.userRole === UserRole.Coach) {
            throw new HttpException(UserMessage.USER_ROLE_WRONG, HttpStatus.CONFLICT);
          }

          existUser.friends.push(shoosenUserId);
          possibleFriend.friends.push(existUser._id.toString());

          const shopUserEntity = new ShopUserEntity(existUser);
          const possibleFriendEntity = new ShopUserEntity(possibleFriend);

          await this.ShopAlertService.create({alertText: 'New friend!', userId: possibleFriend._id.toString(), createdAt: new Date()});
          await this.shopUserRepository.update(existUser._id, shopUserEntity);
          await this.shopUserRepository.update(possibleFriend._id, possibleFriendEntity);
        };
        break;
      case FRIEND_LIST_UPDATE_TYPE_DELETE:
        {
          const yourfriendIndex = existUser.friends.indexOf(shoosenUserId);
          if(yourfriendIndex === -1) {
            throw new HttpException(UserMessage.FRIEND_NOT_FOUND, HttpStatus.CONFLICT);
          } else {
            existUser.friends.splice(yourfriendIndex, 1);
          }

          const possibleFriendIndex = possibleFriend.friends.indexOf(existUser._id);
          if(possibleFriendIndex === -1) {
            throw new HttpException(UserMessage.FRIEND_NOT_FOUND, HttpStatus.CONFLICT);
          } else {
            possibleFriend.friends.splice(possibleFriendIndex, 1);
          }

          const shopUserEntity = new ShopUserEntity(existUser);
          const possibleFriendEntity = new ShopUserEntity(possibleFriend);

          await this.shopUserRepository.update(existUser._id, shopUserEntity);
          await this.shopUserRepository.update(possibleFriend._id, possibleFriendEntity);
        };
        break;
      default:
        throw new HttpException(UserMessage.UNKNOWN_FRIEND_LIST_UPDATE_TYPE, HttpStatus.CONFLICT);
    }
    return existUser;
  }

  async getAlert(userEmail: string, alertId: string) {

    const existUser = await this.shopUserRepository.findByEmail(userEmail);

    if (!existUser) {
      throw new HttpException(UserMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    return await this.ShopAlertService.getAlert(userEmail, alertId);
  }

  async getSomeAlerts(userEmail: string, count?: number) {

    const existUser = await this.shopUserRepository.findByEmail(userEmail);

    if (!existUser) {
      throw new HttpException(UserMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    return await this.ShopAlertService.getSomeAlerts(existUser._id, count);
  }

  async deleteAlert(alertId: string, userEmail: string) {
    const existUser = await this.shopUserRepository.findByEmail(userEmail);

    if (!existUser) {
      throw new HttpException(UserMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    return await this.ShopAlertService.deleteAlert(userEmail, alertId);
  }

}
