import {Expose, Transform, Type} from 'class-transformer';
import { UserRdo } from '../../auth/rdo/user.rdo';
import { TrainingRdo } from '../../shop-training/rdo/training.rdo';

export class TrainingDiaryRdo {
  @Transform(({ obj }) => obj._id.toString())
  @Expose({ name: '_id'})
  public id: string;

  @Expose()
  public caloriesSpentAmount: number;

  @Expose()
  public date: Date;

  @Expose()
  public timeSpentAmount: string;

  @Expose()
  @Type(() => UserRdo)
  public userId: UserRdo;

  @Expose()
  @Type(() => TrainingRdo)
  public trainingId: TrainingRdo;
}
