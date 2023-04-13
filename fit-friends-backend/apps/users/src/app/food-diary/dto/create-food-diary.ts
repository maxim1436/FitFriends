import { IsString, IsNumber } from 'class-validator';
import { TypeOfEating } from '@fit-friends-backend/shared-types';
import { ApiProperty } from '@nestjs/swagger/dist';

export class CreateFoodDiaryDto {

  @ApiProperty()
  @IsNumber()
  public caloriesAmount: number;

  @ApiProperty()
  @IsString()
  public date: string;

  @ApiProperty()
  @IsString()
  public typeOfEating: string;
}
