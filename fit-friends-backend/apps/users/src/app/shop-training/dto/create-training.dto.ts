import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateTrainingDto {

  // @IsString()
  public title: string;

  // @IsString()
  public avatar: string;

  // @IsString()
  public level: string;

  // @IsString()
  public type: string;

  // @IsString()
  public time: string;

  // @IsNumber()
  public price: number;

  // @IsNumber()
  public calories: number;

  // @IsString()
  public description: string;

  // @IsString()
  public gender: string;

  // @IsString()
  public videoLink: string;

  // @IsNumber()
  public rating: number;

  // @IsString()
  // public coachId: string;

  // @IsBoolean()
  public special: boolean;
}
