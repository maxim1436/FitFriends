import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateTrainingDto {

  @IsOptional()
  @IsString()
  public title?: string;

  @IsOptional()
  @IsString()
  public avatar?: string;

  @IsOptional()
  @IsString()
  public level?: string;

  @IsOptional()
  @IsString()
  public type?: string;

  @IsOptional()
  @IsString()
  public time?: string;

  @IsOptional()
  @IsNumber()
  public price?: number;

  @IsOptional()
  @IsNumber()
  public calories?: number;

  @IsOptional()
  @IsString()
  public description?: string;

  @IsOptional()
  @IsString()
  public gender?: string;

  @IsOptional()
  @IsString()
  public videoLink?: string;

  @IsOptional()
  @IsNumber()
  public rating?: number;

  @IsOptional()
  @IsBoolean()
  public special?: boolean;
}
