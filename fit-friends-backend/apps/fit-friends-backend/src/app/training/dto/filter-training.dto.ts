import { IsNumber, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class FilterTrainingDto {

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  public lowPrice?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  public maxPrice?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  public lowCalories?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  public maxCalories?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  public rating?: number;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  public time?: string[];
}
