import { IsString, IsObject, IsOptional } from 'class-validator';
import { CoachSurvey, UserSurvey } from '@fit-friends-backend/shared-types';
import { ApiProperty } from '@nestjs/swagger/dist';

export class UpdateUserDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  public firstname?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public avatar?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public dateBirth?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public location?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public gender?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public friend?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public favoriteGym?: string;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  public coachSurvey?: CoachSurvey;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  public userSurvey?: UserSurvey;
}
