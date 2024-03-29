import {Expose, Type} from 'class-transformer';
import { TrainingRdo } from '../../training/rdo/training.rdo';

export class CoachOrderRdo {

  @Expose()
  public amount: number;

  @Expose()
  public totalPrice: number;

  @Expose()
  @Type(() => TrainingRdo)
  public service: TrainingRdo;
}
