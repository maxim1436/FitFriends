import { Test } from "@nestjs/testing";
import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";
import { User } from "@fit-friends-backend/shared-types";
import { CreateUserDto } from "../dto/create-user.dto";
import { LoginUserDto } from "../dto/login-user.dto";

jest.mock('../auth.service');

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () =>{

    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService]
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    authController = moduleRef.get<AuthController>(AuthController);
  });

  describe('RegisterUser', () => {
    it('should register user', async () => {
      let user: User;
      let createUserDto: CreateUserDto = {
        email: "user@mail2.ru",
        firstname: "Max",
        avatar: "qwerty",
        password: "123456",
        role: "пользователь",
        dateBirth: "1990-10-24",
        location: "Спортивная",
        gender: "мужской",
        userSurvey: {
          "level": "новичок",
          "type": ["бокс"],
          "time": "30-50 мин",
          "caloriesToLose": 1000,
          "caloriesLosePerDay": 1000,
          "readyToTrain": true
        }
      }

      jest.spyOn(authService, 'register').mockImplementation(async ():Promise<User> => Promise.resolve(user));

      expect(await authController.create(createUserDto)).toEqual(user);
    });
  });

  describe('LoginUser', () => {
    it('should login user', async () => {
      let access_token;
      let loginUserDto: LoginUserDto = {
        email: "user@mail2.ru",
        password: "123456"
      }

      jest.spyOn(authService, 'loginUser').mockImplementation(() => access_token);

      expect(await authController.login(loginUserDto)).toEqual(access_token);
    });
  });

});
