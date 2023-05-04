import { IsEmail, IsString, IsObject } from 'class-validator';
import {AuthUserMessage} from '../auth.constant';
import { CoachSurvey, UserSurvey } from '@fit-friends-backend/shared-types';
import { ApiProperty } from '@nestjs/swagger/dist';

export class CreateUserDto {

  @ApiProperty()
  @IsEmail(
    {},
    {message: AuthUserMessage.AUTH_USER_EMAIL_NOT_VALID},
  )
  public email: string;

  @ApiProperty()
  @IsString()
  public firstname: string;

  @ApiProperty()
  @IsString()
  public avatar: string;

  @ApiProperty()
  @IsString()
  public password: string;

  @ApiProperty()
  @IsString()
  public role: string;

  @ApiProperty()
  @IsString()
  public dateBirth: string;

  @ApiProperty()
  @IsString()
  public location: string;

  @ApiProperty()
  @IsString()
  public gender: string;

  @ApiProperty()
  @IsObject()
  public coachSurvey?: CoachSurvey;

  @ApiProperty()
  @IsObject()
  public userSurvey?: UserSurvey;
}
