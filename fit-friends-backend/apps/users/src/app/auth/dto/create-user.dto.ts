import { IsEmail, IsString, IsObject } from 'class-validator';
import {AuthUserMessage} from '../auth.constant';
import { CoachSurvey, UserSurvey } from '@fit-friends-backend/shared-types';

export class CreateUserDto {

  @IsEmail(
    {},
    {message: AuthUserMessage.AUTH_USER_EMAIL_NOT_VALID},
  )
  public email: string;


  @IsString()
  public firstname: string;

  @IsString()
  public avatar: string;

  @IsString()
  public password: string;

  @IsString()
  public role: string;

  @IsString()
  public dateBirth: string;

  @IsString()
  public location: string;

  @IsString()
  public gender: string;

  @IsObject()
  public coachSurvey?: CoachSurvey;

  @IsObject()
  public userSurvey?: UserSurvey;
}
