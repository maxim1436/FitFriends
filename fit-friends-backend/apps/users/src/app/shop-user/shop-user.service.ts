import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ShopUserRepository } from '../shop-user/shop-user.repository';
import { ShopUserEntity } from '../shop-user/shop-user.entity';
import { UserRole, User } from '@fit-friends-backend/shared-types';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { UserMessage } from './shop-user.constant';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ShopUserService {
  constructor(
    private readonly shopUserRepository: ShopUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async getUser(id: string) {

    const existUser = await this.shopUserRepository.findById(id);

    if (!existUser) {
      throw new HttpException(UserMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    return existUser;
  }

  async findByEmail(email: string) {

    const existUser = await this.shopUserRepository.findByEmail(email);

    if (!existUser) {
      throw new HttpException(UserMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    return existUser;
  }

  async updateUser(dto: UpdateUserDto, email: string) {

    const existUser = await this.shopUserRepository.findByEmail(email);

    if (dto.friend) {
      const friendIndex = existUser.friends.indexOf(dto.friend);

      if(friendIndex === -1) {
        existUser.friends.push(dto.friend);

      } else {
        existUser.friends.splice(friendIndex, 1);
      }
      delete dto.friend;
    }

    const shopUserEntity = Object.assign(new ShopUserEntity(existUser), dto);
    return this.shopUserRepository.update(existUser._id, shopUserEntity);
  }

  async getFriends(id: string) {

    const existUser = await this.shopUserRepository.findById(id);

    if (!existUser) {
      throw new HttpException(UserMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
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

}
