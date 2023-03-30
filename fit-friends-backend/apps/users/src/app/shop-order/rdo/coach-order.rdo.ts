import {Expose, Transform} from 'class-transformer';
import { TrainingRdo } from '../../shop-training/rdo/training.rdo';

export class CoachOrderRdo {

  @Expose()
  public amount: number;

  @Expose()
  public totalPrice: number;

  @Expose()
  public service: TrainingRdo;
}
