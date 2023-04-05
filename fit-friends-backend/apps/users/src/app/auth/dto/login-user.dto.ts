import {IsEmail, IsString} from 'class-validator';
import {AuthUserMessage} from '../auth.constant';
import { ApiProperty } from '@nestjs/swagger/dist';

export class LoginUserDto {

  @ApiProperty()
  @IsEmail(
    {},
    {message: AuthUserMessage.AUTH_USER_EMAIL_NOT_VALID}
  )
  public email: string;

  @ApiProperty()
  @IsString()
  public password: string;
}
