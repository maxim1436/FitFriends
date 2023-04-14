import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class UpdateFoodDiaryDto {

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  public caloriesAmount?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public date?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public typeOfEating?: string;

}
