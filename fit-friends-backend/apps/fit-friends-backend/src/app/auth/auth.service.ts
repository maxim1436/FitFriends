import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { ShopUserRepository } from '../shop-user/shop-user.repository';
import { ShopUserEntity } from '../shop-user/shop-user.entity';
import { UserRole, User } from '@fit-friends-backend/shared-types';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthUserMessage } from './auth.constant';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';
import { USER_EMAIL, COACH_EMAIL, USER_FIRSTNAME, USER_AVATAR, COACH_AVATAR, USER_PASSWORD,
  USER_DATE_BIRTH, USER_LOCATION, USER_GENDER, USER_SURVEY, COACH_SURVEY } from '../shop-user/mocks/mock-user-data';
import { getRandomElementOfArray } from '../utils/utils';

const USER_ROLE_COACH = 'тренер'

@Injectable()
export class AuthService {
  constructor(
    private readonly shopUserRepository: ShopUserRepository,
    private readonly jwtService: JwtService,
  ) {
    this.DbFillUsers();
  }

  async DbFillUsers() {

    const usersArray = await this.shopUserRepository.findByDefault();

    if(usersArray.length === 0) {
      for(let i = 0; i < 3; i++) {
        const user = {
          email: USER_EMAIL[i],
          firstname: getRandomElementOfArray(USER_FIRSTNAME),
          avatar: getRandomElementOfArray(USER_AVATAR),
          userRole: UserRole.User,
          dateBirth: dayjs(getRandomElementOfArray(USER_DATE_BIRTH)).toDate(),
          friends: [], friendsAsk: [], favoriteGyms: [],
          location: getRandomElementOfArray(USER_LOCATION),
          gender: getRandomElementOfArray(USER_GENDER),
          userSurvey: USER_SURVEY,
          passwordHash: '',
          userBalance: {
            training: '',
            availableTrainingsAmount: 0,
            seasonTicket: '',
            availableSeasonTicketsAmount: 0
          }
        }

        const existUser = await this.shopUserRepository
          .findByEmail(user.email);

        if (existUser) {
          throw new HttpException(AuthUserMessage.AUTH_USER_EXISTS, HttpStatus.CONFLICT);
        }

        const userEntity = await new ShopUserEntity(user)
          .setPassword(USER_PASSWORD);

        await this.shopUserRepository
          .create(userEntity);

      }
    }
  }

  async DbFillCoaches(index: number) {
    const user = {
      email: COACH_EMAIL[index],
      firstname: getRandomElementOfArray(USER_FIRSTNAME),
      avatar: COACH_AVATAR[0],
      userRole: UserRole.Coach,
      dateBirth: dayjs(getRandomElementOfArray(USER_DATE_BIRTH)).toDate(),
      friends: [], friendsAsk: [], favoriteGyms: [],
      location: getRandomElementOfArray(USER_LOCATION),
      gender: getRandomElementOfArray(USER_GENDER),
      coachSurvey: COACH_SURVEY,
      passwordHash: '',
      userBalance: {
        training: '',
        availableTrainingsAmount: 0,
        seasonTicket: '',
        availableSeasonTicketsAmount: 0
      }
    }

    const existUser = await this.shopUserRepository
      .findByEmail(user.email);

    if (existUser) {
      throw new HttpException(AuthUserMessage.AUTH_USER_EXISTS, HttpStatus.CONFLICT);
    }

    const userEntity = await new ShopUserEntity(user)
      .setPassword(USER_PASSWORD);

    const createdUser = await this.shopUserRepository
      .create(userEntity);

    return createdUser;
  }

  async register(dto: CreateUserDto) {
    const {email, firstname, avatar, password, role,
      dateBirth, location, gender, userSurvey, coachSurvey} = dto;

    const shopUser = {
      email, firstname, avatar, userRole: role === USER_ROLE_COACH ? UserRole.Coach: UserRole.User,
      dateBirth: dayjs(dateBirth).toDate(), friends: [], friendsAsk: [],
      favoriteGyms: [], location, gender, coachSurvey, userSurvey, passwordHash: '',
      userBalance: {training: '', availableTrainingsAmount: 0, seasonTicket: '', availableSeasonTicketsAmount: 0}
    };

    const existUser = await this.shopUserRepository
      .findByEmail(email);

    if (existUser) {
      throw new HttpException(AuthUserMessage.AUTH_USER_EXISTS, HttpStatus.CONFLICT);
    }

    const userEntity = await new ShopUserEntity(shopUser)
      .setPassword(password);

    const createdUser = await this.shopUserRepository
      .create(userEntity);

      return createdUser;
  }

  async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.shopUserRepository.findByEmail(email);

    if (!existUser) {
      throw new UnauthorizedException(AuthUserMessage.AUTH_USER_NOT_FOUND);
    }

    const shopUserEntity = new ShopUserEntity(existUser);
    if (! await shopUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(AuthUserMessage.AUTH_USER_PASSWORD_WRONG);
    }

    return shopUserEntity.toObject();
  }

  async loginUser(user: User) {
    const payload = {
      sub: user._id,
      email: user.email,
      userRole: user.userRole,
      firstname: user.firstname
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
