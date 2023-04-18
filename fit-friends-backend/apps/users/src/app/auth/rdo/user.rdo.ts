import {Expose, Transform} from 'class-transformer';
import { UserRole } from '@fit-friends-backend/shared-types';

export class UserRdo {
  @Transform(({ obj }) => obj._id.toString())
  @Expose({ name: '_id'})
  public id: string;

  @Expose()
  public email: string;

  @Expose()
  public firstname: string;

  @Expose()
  public avatar: string;

  @Expose()
  public userRole: UserRole;

  @Expose()
  public dateBirth: Date;

  @Expose()
  public location: string;

  @Expose()
  public friends: string[];

  @Expose()
  public gender: string;

  @Expose()
  public userBalance?: object;

  @Expose()
  public coachSurvey?: object;

  @Expose()
  public userSurvey?: object;
}
