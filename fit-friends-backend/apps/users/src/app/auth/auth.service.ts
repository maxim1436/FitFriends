import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ShopUserRepository } from '../shop-user/shop-user.repository';
import { ShopUserEntity } from '../shop-user/shop-user.entity';
import { UserRole, User } from '@fit-friends-backend/shared-types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUserMessage } from './auth.constant';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';
import { fillObject } from '@fit-friends-backend/core';
import { UserRdo } from './rdo/user.rdo';

@Injectable()
export class AuthService {
  constructor(
    private readonly shopUserRepository: ShopUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    const {email, firstname, avatar, password, role,
      dateBirth, location, gender, userSurvey, coachSurvey} = dto;

    const shopUser = {
      email, firstname, avatar, userRole: role === 'тренер' ? UserRole.Coach: UserRole.User,
      dateBirth: dayjs(dateBirth).toDate(),
      location, gender, coachSurvey, userSurvey,  passwordHash: ''
    };

    const existUser = await this.shopUserRepository
      .findByEmail(email);

    if (existUser) {
      throw new Error(AuthUserMessage.AUTH_USER_EXISTS);
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

  async getUser(id: string) {
    return this.shopUserRepository.findById(id);
  }

  async updateUser(id: string, dto: UpdateUserDto) {

    const existUser = await this.shopUserRepository.findById(id);

    if (!existUser) {
      throw new UnauthorizedException(AuthUserMessage.AUTH_USER_NOT_FOUND);
    }

    const shopUserEntity = Object.assign(new ShopUserEntity(existUser), dto);

    return this.shopUserRepository.update(id, shopUserEntity);
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
