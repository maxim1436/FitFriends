import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EventPattern } from '@nestjs/microservices';
import { CommandEvent } from '@fit-friends-backend/shared-types';
import { Controller } from '@nestjs/common';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
  ) {}

  @EventPattern({ cmd: CommandEvent.AddSubscriber})
  public async create(subscriber: CreateSubscriberDto) {
    return this.subscriberService.addSubscriber(subscriber);
  }

  @EventPattern({ cmd: CommandEvent.addTraining})
  public async newTrainingAppear(coachEmail: string) {
    return this.subscriberService.sendNotify(coachEmail);
  }
}
