import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class CreateTrainingDiaryDto {

  @ApiProperty()
  @IsNumber()
  public caloriesSpentAmount: number;

  @ApiProperty()
  @IsString()
  public date: string;

}
