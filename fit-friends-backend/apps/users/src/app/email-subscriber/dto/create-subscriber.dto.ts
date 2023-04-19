import { IsEmail, IsNotEmpty, IsArray } from 'class-validator';
import { EmailSubscriberMessage } from '../email-subscriber.constant';

export class CreateSubscriberDto {

  @IsEmail({}, { message: EmailSubscriberMessage.EMAIL_NOT_VALID })
  email: string;

  @IsArray()
  coachEmail: string[];

  @IsNotEmpty({ message: EmailSubscriberMessage.USER_ID_IS_EMPTY })
  userId: string;
}
