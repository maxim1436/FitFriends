import { Module } from '@nestjs/common';
import { TrainingController } from './training.controller';
import { TrainingModule } from './training.module';
import { TrainingService } from './training.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../config/jwt.config';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { EmailSubscriberModule } from '../email-subscriber/email-subscriber.module';
import { ClientsModule } from '@nestjs/microservices';
import { RABBITMQ_SERVICE } from '../user/user.constant';
import { getRabbitMqConfig } from '../../config/rabbitmq.config';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TrainingModule,
    UserModule,
    AuthModule,
    EmailSubscriberModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService]
      }
    ]),
  ],
  controllers: [TrainingController],
  providers: [TrainingService, JwtStrategy],
  exports: [TrainingService]
})
export class CRUDTrainingModule {}
