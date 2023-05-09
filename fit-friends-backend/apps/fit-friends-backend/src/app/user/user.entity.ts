import { CoachSurvey, User, UserBalance, UserRole, UserSurvey } from '@fit-friends-backend/shared-types';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './user.constant';

export class UserEntity implements User {
  public _id: string;
  public email: string;
  public firstname: string;
  public avatar: string;
  public passwordHash: string;
  public userRole: UserRole;
  public dateBirth: Date;
  public location: string;
  public gender: string;
  public coachSurvey?: CoachSurvey;
  public userSurvey?: UserSurvey;
  public userBalance?: UserBalance;
  public friends: string[];
  public favoriteGyms: string[];
  public friendsAsk: string[];

  constructor(user: User) {
    this.fillEntity(user);
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(user: User) {
    const {_id, email, firstname, avatar, passwordHash, userRole, dateBirth,
    location, gender, friends, friendsAsk, favoriteGyms, userBalance} = user;
    this._id = _id;
    this.email = email;
    this.firstname = firstname;
    this.avatar = avatar;
    this.passwordHash = passwordHash;
    this.userRole = userRole;
    this.dateBirth = dateBirth;
    this.location = location;
    this.gender = gender;
    this.friends = friends;
    this.friendsAsk = friendsAsk;
    this.favoriteGyms = favoriteGyms;
    this.userBalance = userBalance;

    if (this.userRole === UserRole.Coach) {
      this.coachSurvey = user.coachSurvey;
    } else {
      this.userSurvey = user.userSurvey;
    }
  }

}
