import { Test } from '@nestjs/testing';
import { ShopUserController } from '../shop-user.controller';
import { FriendsController } from '../friends.controller';
import { FavoriteGymsController } from '../favorite-gyms.controller';
import { ShopUserService } from '../shop-user.service';
import { userStub } from './stubs/shop-user.stub';
import { User, Alert } from '@fit-friends-backend/shared-types';
import { UpdateUserDto } from '../../auth/dto/update-user.dto';
import { UpdateUserBalanceDto } from '../../auth/dto/update-user-balance.dto';

jest.mock('../shop-user.service');

describe('ShopUserController', () => {
  let shopUserController: ShopUserController;
  let favoriteGymsController: FavoriteGymsController;
  let friendsController: FriendsController;
  let shopUserService: ShopUserService;

  const requestMock = {
    user: {
      email: userStub().email,
    },
    query: {},
  } as unknown as Request;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [ShopUserController, FriendsController, FavoriteGymsController],
        providers: [ShopUserService],
      }).compile();

    shopUserService = moduleRef.get<ShopUserService>(ShopUserService);
    shopUserController = moduleRef.get<ShopUserController>(ShopUserController);
    favoriteGymsController = moduleRef.get<FavoriteGymsController>(FavoriteGymsController);
    friendsController = moduleRef.get<FriendsController>(FriendsController)
  });

  describe('GetUser', () => {
    it('should return a user', async () => {
      let user: User;
      jest.spyOn(shopUserService, 'getUser').mockImplementation(async ():Promise<User> => Promise.resolve(user));

      expect(await shopUserController.show(userStub().id)).toEqual(user);
    });
  });

  describe('GetUsers', () => {
    it('should return some users', async () => {
      let user: User[];
      jest.spyOn(shopUserService, 'getUsers').mockImplementation(async ():Promise<User[]> => Promise.resolve(user));

      expect(await shopUserController.showUsers(requestMock, 2)).toEqual(user);
    });
  });

  describe('UpdateUser', () => {
    it('should update user', async () => {
      let user: User;
      const UpdateUserDto: UpdateUserDto = {
        firstname: 'Alex'
      }

      jest.spyOn(shopUserService, 'updateUser').mockImplementation(async ():Promise<User> => Promise.resolve(user));

      expect(await shopUserController.update(UpdateUserDto, requestMock)).toEqual(user);
    });
  });

  describe('AddSubscriber', () => {
    it('should return a user', async () => {
      let user: User;
      jest.spyOn(shopUserService, 'addSubscriber').mockImplementation(async ():Promise<User> => Promise.resolve(user));

      expect(await shopUserController.create(requestMock ,userStub().id)).toEqual(user);
    });
  });

  describe('GetFriends', () => {
    it('should return user`s friends array', async () => {
      let user: User[];
      jest.spyOn(shopUserService, 'getFriends').mockImplementation(async ():Promise<User[]> => Promise.resolve(user));

      expect(await friendsController.showFriends(requestMock)).toEqual(user);
    });
  });


  describe('UpdateFriendsList', () => {
    it('should return user with updated friends array', async () => {
      let user: User;
      jest.spyOn(shopUserService, 'updateFriendsList').mockImplementation(async ():Promise<User> => Promise.resolve(user));

      expect(await friendsController.updateFriends(userStub().id, requestMock, requestMock)).toEqual(user);
    });
  });

  describe('UpdateUserBalance', () => {
    it('should update user balance', async () => {
      let user: User;
      const updateUserBalance: UpdateUserBalanceDto = {
        availableTrainingsAmount: 12
      }
      jest.spyOn(shopUserService, 'updateUserBalance').mockImplementation(async ():Promise<User> => Promise.resolve(user));

      expect(await shopUserController.updateUserBalance(updateUserBalance, requestMock, requestMock)).toEqual(user);
    });
  });

  describe('GetAlert', () => {
    it('should return an alert', async () => {
      let alert: Alert;
      jest.spyOn(shopUserService, 'getAlert').mockImplementation(async ():Promise<Alert> => Promise.resolve(alert));

      expect(await shopUserController.getAlert(userStub().id, requestMock)).toEqual(alert);
    });
  });

  describe('GetAlerts', () => {
    it('should return alerts array', async () => {
      let alert: Alert[];
      jest.spyOn(shopUserService, 'getSomeAlerts').mockImplementation(async ():Promise<Alert[]> => Promise.resolve(alert));

      expect(await shopUserController.showAlerts(userStub().id, requestMock, requestMock)).toEqual(alert);
    });
  });

  describe('DeleteAlert', () => {
    it('should delete an alert', async () => {
      let alert: Alert;
      jest.spyOn(shopUserService, 'deleteAlert').mockImplementation();

      expect(await shopUserController.deleteAlert(userStub().id, requestMock)).toEqual(alert);
    });
  });

});
