import { Module } from '@nestjs/common';
import { ShopTrainingController } from './shop-training.controller';
import { ShopTrainingModule } from './shop-training.module';
import { ShopTrainingService } from './shop-training.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../config/jwt.config';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { ShopUserModule } from '../shop-user/shop-user.module';
import { EmailSubscriberModule } from '../email-subscriber/email-subscriber.module';
import { ClientsModule } from '@nestjs/microservices';
import { RABBITMQ_SERVICE } from '../shop-user/shop-user.constant';
import { getRabbitMqConfig } from '../../config/rabbitmq.config';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ShopTrainingModule,
    ShopUserModule,
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
  controllers: [ShopTrainingController],
  providers: [ShopTrainingService, JwtStrategy],
  exports: [ShopTrainingService]
})
export class CRUDTrainingModule {}
