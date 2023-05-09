import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserModel, UserSchema} from './user.model';
import {UserRepository} from './user.repository';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../config/jwt.config';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { ClientsModule } from '@nestjs/microservices';
import { RABBITMQ_SERVICE } from './user.constant';
import { getRabbitMqConfig } from '../../config/rabbitmq.config';
import { EmailSubscriberModule } from '../email-subscriber/email-subscriber.module';
import { AlertModule } from '../alert/alert.module';
import { CRUDAlertModule } from '../alert/crud-alert.module';
import { GymModule } from '../gym/gym.module';
import { FriendsController } from './friends.controller';
import { FavoriteGymsController } from './favorite-gyms.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema }
    ]),
    CRUDAlertModule,
    GymModule,
    AlertModule,
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
  providers: [UserRepository, UserService, JwtStrategy],
  exports: [UserRepository, UserService],
})

export class UserModule {}
