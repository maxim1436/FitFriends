import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ShopUserModule } from './shop-user/shop-user.module';
import { ShopTrainingModule } from './shop-training/shop-training.module';
import { CRUDTrainingModule } from './shop-training/crud-training.module';
import { ShopOrderModule } from './shop-order/shop-order.module';
import { CRUDOrderModule } from './shop-order/crud-order.module';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.constant';
import databaseConfig from '../config/database.config';
import {validateEnvironments} from './env.validation';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoDbConfig } from '../config/mongodb.config';
import { jwtOptions } from '../config/jwt.config';
import { FoodDiaryModule } from './food-diary/food-diary.module';
import { TrainingDiaryModule } from './training-diary/training-diary.module';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { mailOptions } from '../config/mail.config';
import { ShopAlertModule } from './shop-alert/shop-alert.module';
import { CRUDAlertModule } from './shop-alert/crud-alert.module';
import { PersonalTrainingModule } from './personal-training/personal-training.module';
import { GymModule } from './gym/gym.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig, jwtOptions, rabbitMqOptions, mailOptions],
      validate: validateEnvironments,
    }),
    MongooseModule.forRootAsync(
      getMongoDbConfig()
    ),
    EmailSubscriberModule,
    CommentModule,
    AuthModule,
    GymModule,
    CRUDAlertModule,
    PersonalTrainingModule,
    ShopAlertModule,
    FoodDiaryModule,
    TrainingDiaryModule,
    ShopUserModule,
    ShopTrainingModule,
    CRUDTrainingModule,
    ShopOrderModule,
    CRUDOrderModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
