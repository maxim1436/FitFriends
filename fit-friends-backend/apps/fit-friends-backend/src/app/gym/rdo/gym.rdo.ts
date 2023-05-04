import {Expose, Transform} from 'class-transformer';

export class GymRdo {
  @Transform(({ obj }) => obj._id.toString())
  @Expose({ name: '_id'})
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public location: string;

  @Expose()
  public verify: boolean;

  @Expose()
  public parameters: string[];

  @Expose()
  public photos: string[];

  @Expose()
  public description: string;

  @Expose()
  public price: number;

  @Expose()
  public dateBirth: Date;
}
