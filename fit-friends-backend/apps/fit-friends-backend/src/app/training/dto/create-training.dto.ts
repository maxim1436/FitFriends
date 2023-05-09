import { IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class CreateTrainingDto {

  @ApiProperty()
  @IsString()
  public title: string;

  @ApiProperty()
  @IsString()
  public preview: string;

  @ApiProperty()
  @IsString()
  public level: string;

  @ApiProperty()
  @IsString()
  public type: string;

  @ApiProperty()
  @IsString()
  public time: string;

  @ApiProperty()
  @IsNumber()
  public price: number;

  @ApiProperty()
  @IsNumber()
  public calories: number;

  @ApiProperty()
  @IsString()
  public description: string;

  @ApiProperty()
  @IsString()
  public gender: string;

  @ApiProperty()
  @IsString()
  public videoLink: string;

  @ApiProperty()
  @IsNumber()
  public rating: number;

  @ApiProperty()
  @IsBoolean()
  public special: boolean;
}
