import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ShopUserModel, ShopUserSchema} from './shop-user.model';
import {ShopUserRepository} from './shop-user.repository';
import { ShopUserService } from './shop-user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../config/jwt.config';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { ClientsModule } from '@nestjs/microservices';
import { RABBITMQ_SERVICE } from './shop-user.constant';
import { getRabbitMqConfig } from '../../config/rabbitmq.config';
import { EmailSubscriberModule } from '../email-subscriber/email-subscriber.module';
import { ShopAlertModule } from '../shop-alert/shop-alert.module';
import { CRUDAlertModule } from '../shop-alert/crud-alert.module';
import { GymModule } from '../gym/gym.module';
import { FriendsController } from './friends.controller';
import { FavoriteGymsController } from './favorite-gyms.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShopUserModel.name, schema: ShopUserSchema }
    ]),
    CRUDAlertModule,
    GymModule,
    ShopAlertModule,
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
  controllers: [FriendsController, FavoriteGymsController],
  providers: [ShopUserRepository, ShopUserService, JwtStrategy],
  exports: [ShopUserRepository, ShopUserService],
})

export class ShopUserModule {}
