import {Expose, Transform} from 'class-transformer';

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
  public service: object;
}
