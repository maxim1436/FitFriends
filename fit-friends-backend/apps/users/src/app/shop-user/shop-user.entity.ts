import { CoachSurvey, User, UserRole, UserSurvey } from '@fit-friends-backend/shared-types';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './shop-user.constant';

export class ShopUserEntity implements User {
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
  public friends: string[];

  constructor(shopUser: User) {
    this.fillEntity(shopUser);
  }

  public async setPassword(password: string): Promise<ShopUserEntity> {
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

  public fillEntity(shopUser: User) {
    this._id = shopUser._id;
    this.email = shopUser.email;
    this.firstname = shopUser.firstname;
    this.avatar = shopUser.avatar;
    this.passwordHash = shopUser.passwordHash;
    this.userRole = shopUser.userRole;
    this.dateBirth = shopUser.dateBirth;
    this.location = shopUser.location;
    this.gender = shopUser.gender;
    this.friends = shopUser.friends;

    if (this.userRole === UserRole.Coach) {
      this.coachSurvey = shopUser.coachSurvey;
    } else {
      this.userSurvey = shopUser.userSurvey;
    }
  }

}
