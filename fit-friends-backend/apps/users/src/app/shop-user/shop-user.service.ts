import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { fillObject } from '@fit-friends-backend/core';
import { UserRdo } from '../auth/rdo/user.rdo';
import { ShopUserRepository } from '../shop-user/shop-user.repository';
import { ShopUserEntity } from '../shop-user/shop-user.entity';
import { UserRole, User } from '@fit-friends-backend/shared-types';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { UserMessage } from './shop-user.constant';
import { JwtService } from '@nestjs/jwt';

const FRIEND_LIST_UPDATE_TYPE_ASK = 'ask';
const FRIEND_LIST_UPDATE_TYPE_APPROVE = 'approve';
const FRIEND_LIST_UPDATE_TYPE_CANCEL = 'cancel';
const FRIEND_LIST_UPDATE_TYPE_DELETE = 'delete';

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

    if (existUser.userRole === UserRole.Coach) {
      throw new HttpException(UserMessage.USER_ROLE_WRONG, HttpStatus.CONFLICT);
    }

    const possibleFriend = await this.shopUserRepository.findById(shoosenUserId);

    if (!possibleFriend) {
      throw new HttpException(UserMessage.POSSIBLE_FRIEND_NOT_FOUND, HttpStatus.CONFLICT);
    }

    switch(updateType) {
      case FRIEND_LIST_UPDATE_TYPE_ASK:
        {
          possibleFriend.friendsAsk.push(existUser._id);
          const possibleFriendEntity = new ShopUserEntity(possibleFriend);
          this.shopUserRepository.update(possibleFriend._id, possibleFriendEntity);
        };
        break;
      case FRIEND_LIST_UPDATE_TYPE_APPROVE:
        {
          existUser.friends.push(shoosenUserId);
          const friendIndex = existUser.friendsAsk.indexOf(shoosenUserId);
          if(friendIndex === -1) {
            throw new HttpException(UserMessage.FRIENDSHIP_ASK_NOT_FOUND, HttpStatus.CONFLICT);
          } else {
            existUser.friendsAsk.splice(friendIndex, 1);
          }
          possibleFriend.friends.push(existUser._id);
          const shopUserEntity = new ShopUserEntity(existUser);
          const possibleFriendEntity = new ShopUserEntity(possibleFriend);
          this.shopUserRepository.update(existUser._id, shopUserEntity);
          this.shopUserRepository.update(possibleFriend._id, possibleFriendEntity);
        };
        break;
      case FRIEND_LIST_UPDATE_TYPE_CANCEL:
        {
          const friendIndex = existUser.friendsAsk.indexOf(shoosenUserId);
          if(friendIndex === -1) {
            throw new HttpException(UserMessage.FRIENDSHIP_ASK_NOT_FOUND, HttpStatus.CONFLICT);
          } else {
            existUser.friendsAsk.splice(friendIndex, 1);
          }
          const shopUserEntity = new ShopUserEntity(existUser);
          this.shopUserRepository.update(existUser._id, shopUserEntity);
        };
        break;
      case FRIEND_LIST_UPDATE_TYPE_DELETE:
        {
          const yourfriendsIndex = existUser.friends.indexOf(shoosenUserId);
          if(yourfriendsIndex === -1) {
            throw new HttpException(UserMessage.FRIEND_NOT_FOUND, HttpStatus.CONFLICT);
          } else {
            existUser.friends.splice(yourfriendsIndex, 1);
          }

          const possibleFriendIndex = possibleFriend.friends.indexOf(existUser._id);
          if(possibleFriendIndex === -1) {
            throw new HttpException(UserMessage.FRIEND_NOT_FOUND, HttpStatus.CONFLICT);
          } else {
            possibleFriend.friends.splice(possibleFriendIndex, 1);
          }
          const shopUserEntity = new ShopUserEntity(existUser);
          const possibleFriendEntity = new ShopUserEntity(possibleFriend);
          this.shopUserRepository.update(existUser._id, shopUserEntity);
          this.shopUserRepository.update(possibleFriend._id, possibleFriendEntity);
        };
        break;
      default:
        throw new HttpException(UserMessage.UNKNOWN_FRIEND_LIST_UPDATE_TYPE, HttpStatus.CONFLICT);
    }
    return existUser;
  }

}
