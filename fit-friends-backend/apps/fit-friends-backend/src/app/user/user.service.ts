import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UpdateUserBalanceDto } from '../auth/dto/update-user-balance.dto';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { UserRole, CommandEvent } from '@fit-friends-backend/shared-types';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { UserMessage, RABBITMQ_SERVICE   } from './user.constant';
import { ClientProxy } from '@nestjs/microservices';
import { EmailSubscriberService } from '../email-subscriber/email-subscriber.service';
import { AlertService } from '../alert/alert.service';
import { GymService } from '../gym/gym.service';
import { GymMessage } from '../gym/gym.constant';
import { COACH_EMAIL } from './mocks/mock-user-data';

const LIST_UPDATE_TYPE_ADD = 'add';
const LIST_UPDATE_TYPE_DELETE = 'delete';

const USER_BALANCE_UPDATE_TYPE_INC = 'inc';
const USER_BALANCE_UPDATE_TYPE_DEC = 'dec';
const USER_BALANCE_UPDATE_TYPE_LINK = 'link';

@Injectable()
export class UserService {
  constructor(
    private readonly UserRepository: UserRepository,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
    private readonly EmailSubscriberService: EmailSubscriberService,
    private readonly AlertService: AlertService,
    private readonly GymService: GymService,
  ) {}

  async findMockCoaches() {
    return await this.UserRepository.findMockCoaches(COACH_EMAIL);
  }

  async getFavoriteGyms(email: string) {

    const existUser = await this.UserRepository.findByEmail(email);

    if (!existUser) {
      throw new HttpException(UserMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    return await this.GymService.getFavoriteGyms(existUser.favoriteGyms);
  }

  async updateFavoriteGymsList(email: string, gymId: string, updateType?: string) {
    const existUser = await this.UserRepository.findByEmail(email);

    if (!existUser) {
      throw new HttpException(UserMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    const existGym = await this.GymService.getGym(gymId);

    if (!existGym) {
      throw new HttpException(GymMessage.GYM_NOT_FOUND, HttpStatus.CONFLICT);
    }

    switch(updateType) {
      case LIST_UPDATE_TYPE_ADD:
        {

          const possibleGymIndex = existUser.favoriteGyms.indexOf(gymId);

          if(possibleGymIndex !== -1) {
            throw new HttpException(GymMessage.ALREADY_FAVORITE_GYM, HttpStatus.CONFLICT);
          }

          existUser.favoriteGyms.push(gymId);

          const userEntity = new UserEntity(existUser);

          await this.UserRepository.update(existUser._id, userEntity);
        };
        break;
      case LIST_UPDATE_TYPE_DELETE:
        {

          const possibleGymIndex = existUser.favoriteGyms.indexOf(gymId);

          if(possibleGymIndex === -1) {
            throw new HttpException(GymMessage.GYM_NOT_FOUND, HttpStatus.CONFLICT);
          } else {
            existUser.favoriteGyms.splice(possibleGymIndex, 1);
          }

          const userEntity = new UserEntity(existUser);

          await this.UserRepository.update(existUser._id, userEntity);
        };
        break;
      default:
        throw new HttpException(GymMessage.UNKNOWN_FAVORITE_GYMS_UPDATE_TYPE, HttpStatus.CONFLICT);
    }
    return existUser;
  }

  async getUser(id: string) {

    const existUser = await this.UserRepository.findById(id);

    if (!existUser) {
      throw new HttpException(UserMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    return existUser;
  }

  async addSubscriber(email: string, coachId: string) {
    const existUser = await this.UserRepository.findByEmail(email);

    const existCoach = await this.UserRepository.findById(coachId);

    if (!existCoach) {
      throw new HttpException(UserMessage.COACH_NOT_FOUND, HttpStatus.CONFLICT);
    }

    if (!existUser) {
      throw new HttpException(UserMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    await this.EmailSubscriberService.IsSubscriberExists(existUser.email);

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

    const existUser = await this.UserRepository.findByEmail(email);

    if (!existUser) {
      throw new HttpException(UserMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    return existUser;
  }

  async updateUserBalance(email: string, dto: UpdateUserBalanceDto, updateType?: string) {
    const {training, availableTrainingsAmount, seasonTicket, availableSeasonTicketsAmount} = dto;
    const existUser = await this.UserRepository.findByEmail(email);

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

    const userEntity = new UserEntity(existUser);
    return this.UserRepository.update(existUser._id, userEntity);

  }

  async updateUser(dto: UpdateUserDto, email: string) {

    const existUser = await this.UserRepository.findByEmail(email);

    const userEntity = Object.assign(new UserEntity(existUser), dto);
    return this.UserRepository.update(existUser._id, userEntity);
  }

  async getFriends(email: string) {

    const existUser = await this.UserRepository.findByEmail(email);

    if (!existUser) {
      throw new HttpException(UserMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    if (existUser.friends.length === 0) {
      throw new HttpException(UserMessage.FRIEND_LIST_EMPTY, HttpStatus.CONFLICT);
    }

    return this.UserRepository.findFriends(existUser.friends);
  }

  async getUsers( email:string, count?: number) {

    const existUser = await this.UserRepository.findByEmail(email);

    if (!existUser) {
      throw new HttpException(UserMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    if (existUser.userRole === UserRole.Coach) {
      throw new HttpException(UserMessage.USER_ROLE_WRONG, HttpStatus.CONFLICT);
    }

    return this.UserRepository.findByDefault(count);
  }

  async updateFriendsList(email: string, shoosenUserId: string, updateType?: string) {

    const existUser = await this.UserRepository.findByEmail(email);

    if (!existUser) {
      throw new HttpException(UserMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    const possibleFriend = await this.UserRepository.findById(shoosenUserId);

    if (!possibleFriend) {
      throw new HttpException(UserMessage.POSSIBLE_FRIEND_NOT_FOUND, HttpStatus.CONFLICT);
    }

    switch(updateType) {
      case LIST_UPDATE_TYPE_ADD:
        {
          if (existUser.userRole === UserRole.Coach) {
            throw new HttpException(UserMessage.USER_ROLE_WRONG, HttpStatus.CONFLICT);
          }

          existUser.friends.push(shoosenUserId);
          possibleFriend.friends.push(existUser._id.toString());

          const userEntity = new UserEntity(existUser);
          const possibleFriendEntity = new UserEntity(possibleFriend);

          await this.AlertService.create({alertText: 'New friend!', userId: possibleFriend._id.toString(), createdAt: new Date()});
          await this.UserRepository.update(existUser._id, userEntity);
          await this.UserRepository.update(possibleFriend._id, possibleFriendEntity);
        };
        break;
      case LIST_UPDATE_TYPE_DELETE:
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

          const userEntity = new UserEntity(existUser);
          const possibleFriendEntity = new UserEntity(possibleFriend);

          await this.UserRepository.update(existUser._id, userEntity);
          await this.UserRepository.update(possibleFriend._id, possibleFriendEntity);
        };
        break;
      default:
        throw new HttpException(UserMessage.UNKNOWN_FRIEND_LIST_UPDATE_TYPE, HttpStatus.CONFLICT);
    }
    return existUser;
  }

  async getAlert(userEmail: string, alertId: string) {

    const existUser = await this.UserRepository.findByEmail(userEmail);

    if (!existUser) {
      throw new HttpException(UserMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    return await this.AlertService.getAlert(userEmail, alertId);
  }

  async getSomeAlerts(userEmail: string, count?: number) {

    const existUser = await this.UserRepository.findByEmail(userEmail);

    if (!existUser) {
      throw new HttpException(UserMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    return await this.AlertService.getSomeAlerts(existUser._id, count);
  }

  async deleteAlert(alertId: string, userEmail: string) {
    const existUser = await this.UserRepository.findByEmail(userEmail);

    if (!existUser) {
      throw new HttpException(UserMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    return await this.AlertService.deleteAlert(userEmail, alertId);
  }

}
