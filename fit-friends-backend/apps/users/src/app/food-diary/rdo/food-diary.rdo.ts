import {Expose, Transform, Type} from 'class-transformer';
import { UserRdo } from '../../auth/rdo/user.rdo';
import { TypeOfEating } from '@fit-friends-backend/shared-types';

export class FoodDiaryRdo {
  @Transform(({ obj }) => obj._id.toString())
  @Expose({ name: '_id'})
  public id: string;

  @Expose()
  public caloriesAmount: number;

  @Expose()
  public date: Date;

  @Expose()
  public typeOfEating: TypeOfEating;

  @Expose()
  @Type(() => UserRdo)
  public userId: UserRdo;
}
