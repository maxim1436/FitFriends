import { IsNumber, IsOptional, IsArray } from 'class-validator';

export class FilterTrainingDto {

  @IsOptional()
  @IsNumber()
  public lowPrice?: number;

  @IsOptional()
  @IsNumber()
  public maxPrice?: number;

  @IsOptional()
  @IsNumber()
  public lowCalories?: number;

  @IsOptional()
  @IsNumber()
  public maxCalories?: number;

  @IsOptional()
  @IsNumber()
  public rating?: number;

  @IsOptional()
  @IsArray()
  public time?: string[];
}
