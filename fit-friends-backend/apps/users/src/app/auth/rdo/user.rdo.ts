import {Expose, Transform} from 'class-transformer';

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
  public userRole: string;

  @Expose()
  public dateBirth: Date;

  @Expose()
  public location: string;

  @Expose()
  public gender: string;

  @Expose()
  public coachSurvey?: object;

  @Expose()
  public userSurvey?: object;
}
