import { IsString, IsObject, IsOptional } from 'class-validator';
import { CoachSurvey, UserSurvey } from '@fit-friends-backend/shared-types';

export class UpdateUserDto {

  @IsOptional()
  @IsString()
  public firstname?: string;

  @IsOptional()
  @IsString()
  public avatar?: string;

  @IsOptional()
  @IsString()
  public dateBirth?: string;

  @IsOptional()
  @IsString()
  public location?: string;

  @IsOptional()
  @IsString()
  public gender?: string;

  @IsOptional()
  @IsString()
  public friend?: string;

  @IsOptional()
  @IsObject()
  public coachSurvey?: CoachSurvey;

  @IsOptional()
  @IsObject()
  public userSurvey?: UserSurvey;
}
