import {Expose, Transform, Type} from 'class-transformer';
import { UserRdo } from '../../auth/rdo/user.rdo';
import { TrainingRdo } from '../../training/rdo/training.rdo';

export class UserOrderRdo {
  @Transform(({ obj }) => obj._id.toString())
  @Expose({ name: '_id'})
  public id: string;

  @Expose()
  public orderType: string;

  @Expose()
  public price: number;

  @Expose()
  public amount: number;

  @Expose()
  public totalPrice: number;

  @Expose()
  public paymentType: string;

  @Expose()
  public dateBirth: Date;

  @Expose()
  @Type(() => UserRdo)
  public coach: UserRdo;

  @Expose()
  @Type(() => UserRdo)
  public user: UserRdo;

  @Expose()
  @Type(() => TrainingRdo)
  public service: TrainingRdo;
}
