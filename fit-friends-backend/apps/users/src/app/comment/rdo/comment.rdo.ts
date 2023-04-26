import {Expose, Transform, Type} from 'class-transformer';
import { UserRdo } from '../../auth/rdo/user.rdo';
import { TrainingRdo } from '../../shop-training/rdo/training.rdo';

export class CommentRdo {
  @Transform(({ obj }) => obj._id.toString())
  @Expose({ name: '_id'})
  public id: string;

  @Expose()
  public text: string;

  @Expose()
  public rating: number;

  @Expose()
  public dateBirth: Date;

  @Expose()
  @Type(() => UserRdo)
  public userId: UserRdo;

  @Expose()
  @Type(() => TrainingRdo)
  public trainingId: TrainingRdo;
}
