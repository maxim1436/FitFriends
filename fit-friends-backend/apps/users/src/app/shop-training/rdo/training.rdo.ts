import {Expose, Transform} from 'class-transformer';

export class TrainingRdo {
  @Transform(({ obj }) => obj._id.toString())
  @Expose({ name: '_id'})
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public avatar: string;

  @Expose()
  public level: string;

  @Expose()
  public type: string;

  @Expose()
  public time: string;

  @Expose()
  public price: number;

  @Expose()
  public calories: number;

  @Expose()
  public description: string;

  @Expose()
  public gender: string;

  @Expose()
  public videoLink: string;

  @Expose()
  public rating: number;

  @Expose()
  public coachId: string;

  @Expose()
  public special: boolean;
}
