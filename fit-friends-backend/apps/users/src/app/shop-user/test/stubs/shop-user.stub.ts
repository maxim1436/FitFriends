import { User, UserRole } from "@fit-friends-backend/shared-types";
import { UserRdo } from "../../../auth/rdo/user.rdo";

export const userStub = ():UserRdo => {
  return {
    id: '6443a652c8fad5d9da5cb440',
    email: 'user@mail1.ru',
    firstname: 'Yuri',
    avatar: 'qwerty',
    userRole: UserRole.User,
    dateBirth: new Date('1990-10-23T14:00:00.000Z'),
    location: 'Спортивная',
    gender: 'мужской',
    friends: [
        '6443a65ec8fad5d9da5cb444'
    ],
    friendsAsk: [],
    favoriteGyms: [],
    userSurvey: {
        level: 'новичок',
        type: [
            'бокс'
        ],
        time: '30-50 мин',
        caloriesToLose: 1000,
        caloriesLosePerDay: 1000,
        readyToTrain: true
    },
  }
}
