import {Expose, Transform, Type} from 'class-transformer';
import { UserRdo } from '../../auth/rdo/user.rdo';

export class PersonalTrainingRdo {
  @Transform(({ obj }) => obj._id.toString())
  @Expose({ name: '_id'})
  public id: string;

  @Expose()
  public createdAt: Date;

  @Expose()
  public changingStatusDate: Date;

  @Expose()
  public status: string;

  @Expose()
  @Type(() => UserRdo)
  public initiator: UserRdo;

  @Expose()
  @Type(() => UserRdo)
  public anotherUser: UserRdo;

}
