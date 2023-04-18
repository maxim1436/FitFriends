import { IsString, IsObject, IsOptional, IsNumber } from 'class-validator';
import { CoachSurvey, UserSurvey } from '@fit-friends-backend/shared-types';
import { ApiProperty } from '@nestjs/swagger/dist';

export class UpdateUserBalanceDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  public training?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  public availableTrainingsAmount?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public seasonTicket?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  public availableSeasonTicketsAmount?: number;

}
