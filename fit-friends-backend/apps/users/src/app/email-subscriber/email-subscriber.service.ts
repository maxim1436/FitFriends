import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberMessage } from './email-subscriber.constant';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { MailService } from '../mail/mail.service';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
    private readonly mailService: MailService,
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (existsSubscriber) {
      throw new HttpException(EmailSubscriberMessage.EMAIL_SUBSCRIBER_EXISTS, HttpStatus.CONFLICT);
    }

    this.mailService.sendNotifyNewSubscriber(subscriber);

    return this.emailSubscriberRepository
      .create(new EmailSubscriberEntity(subscriber));
  }

  public async sendNotify(coachEmail: string) {
    const subscribers = await this.emailSubscriberRepository.findAllSubcribers(coachEmail);

    for(let i = 0; i < subscribers.length; i++) {
      this.mailService.sendNewTrainingNotify(subscribers[i]);
    }
  }
}
