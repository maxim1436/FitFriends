import { Test } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { FriendsController } from '../friends.controller';
import { FavoriteGymsController } from '../favorite-gyms.controller';
import { UserService } from '../user.service';
import { userStub } from './stubs/user.stub';
import { User, Alert } from '@fit-friends-backend/shared-types';
import { UpdateUserDto } from '../../auth/dto/update-user.dto';
import { UpdateUserBalanceDto } from '../../auth/dto/update-user-balance.dto';

jest.mock('../user.service');

describe('UserController', () => {
  let userController: UserController;
  let friendsController: FriendsController;
  let userService: UserService;

  const requestMock = {
    user: {
      email: userStub().email,
    },
    query: {},
  } as unknown as Request;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [UserController, FriendsController, FavoriteGymsController],
        providers: [UserService],
      }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
    friendsController = moduleRef.get<FriendsController>(FriendsController)
  });

  describe('GetUser', () => {
    it('should return a user', async () => {
      let user: User;
      jest.spyOn(userService, 'getUser').mockImplementation(async ():Promise<User> => Promise.resolve(user));

      expect(await userController.show(userStub().id)).toEqual(user);
    });
  });

  describe('GetUsers', () => {
    it('should return some users', async () => {
      let user: User[];
      jest.spyOn(userService, 'getUsers').mockImplementation(async ():Promise<User[]> => Promise.resolve(user));

      expect(await userController.showUsers(requestMock, 2)).toEqual(user);
    });
  });

  describe('UpdateUser', () => {
    it('should update user', async () => {
      let user: User;
      const UpdateUserDto: UpdateUserDto = {
        firstname: 'Alex'
      }

      jest.spyOn(userService, 'updateUser').mockImplementation(async ():Promise<User> => Promise.resolve(user));

      expect(await userController.update(UpdateUserDto, requestMock)).toEqual(user);
    });
  });

  describe('AddSubscriber', () => {
    it('should return a user', async () => {
      let user: User;
      jest.spyOn(userService, 'addSubscriber').mockImplementation(async ():Promise<User> => Promise.resolve(user));

      expect(await userController.create(requestMock ,userStub().id)).toEqual(user);
    });
  });

  describe('GetFriends', () => {
    it('should return user`s friends array', async () => {
      let user: User[];
      jest.spyOn(userService, 'getFriends').mockImplementation(async ():Promise<User[]> => Promise.resolve(user));

      expect(await friendsController.showFriends(requestMock)).toEqual(user);
    });
  });


  describe('UpdateFriendsList', () => {
    it('should return user with updated friends array', async () => {
      let user: User;
      jest.spyOn(userService, 'updateFriendsList').mockImplementation(async ():Promise<User> => Promise.resolve(user));

      expect(await friendsController.updateFriends(userStub().id, requestMock, requestMock)).toEqual(user);
    });
  });

  describe('UpdateUserBalance', () => {
    it('should update user balance', async () => {
      let user: User;
      const updateUserBalance: UpdateUserBalanceDto = {
        availableTrainingsAmount: 12
      }
      jest.spyOn(userService, 'updateUserBalance').mockImplementation(async ():Promise<User> => Promise.resolve(user));

      expect(await userController.updateUserBalance(updateUserBalance, requestMock, requestMock)).toEqual(user);
    });
  });

  describe('GetAlert', () => {
    it('should return an alert', async () => {
      let alert: Alert;
      jest.spyOn(userService, 'getAlert').mockImplementation(async ():Promise<Alert> => Promise.resolve(alert));

      expect(await userController.getAlert(userStub().id, requestMock)).toEqual(alert);
    });
  });

  describe('GetAlerts', () => {
    it('should return alerts array', async () => {
      let alert: Alert[];
      jest.spyOn(userService, 'getSomeAlerts').mockImplementation(async ():Promise<Alert[]> => Promise.resolve(alert));

      expect(await userController.showAlerts(userStub().id, requestMock, requestMock)).toEqual(alert);
    });
  });

  describe('DeleteAlert', () => {
    it('should delete an alert', async () => {
      let alert: Alert;
      jest.spyOn(userService, 'deleteAlert').mockImplementation();

      expect(await userController.deleteAlert(userStub().id, requestMock)).toEqual(alert);
    });
  });

});
