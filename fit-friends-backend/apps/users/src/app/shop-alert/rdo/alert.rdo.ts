import {Expose, Transform, Type} from 'class-transformer';
import { UserRdo } from '../../auth/rdo/user.rdo';

export class AlertRdo {
  @Transform(({ obj }) => obj._id.toString())
  @Expose({ name: '_id'})
  public id: string;

  @Expose()
  public createdAt: Date;

  @Expose()
  public alertText: string;

  @Expose()
  @Type(() => UserRdo)
  public userId: UserRdo;

}
