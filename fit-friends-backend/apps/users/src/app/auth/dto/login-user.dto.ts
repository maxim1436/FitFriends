import {IsEmail, IsString} from 'class-validator';
import {AuthUserMessage} from '../auth.constant';

export class LoginUserDto {

  @IsEmail(
    {},
    {message: AuthUserMessage.AUTH_USER_EMAIL_NOT_VALID}
  )
  public email: string;

  @IsString()
  public password: string;
}
