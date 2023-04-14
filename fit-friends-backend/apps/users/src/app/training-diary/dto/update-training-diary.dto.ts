import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class UpdateTrainingDiaryDto {

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  public caloriesSpentAmount?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public date?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public timeSpentAmount?: string;

}
