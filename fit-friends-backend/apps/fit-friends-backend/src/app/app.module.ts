import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TrainingModule } from './training/training.module';
import { CRUDTrainingModule } from './training/crud-training.module';
import { OrderModule } from './order/order.module';
import { CRUDOrderModule } from './order/crud-order.module';
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
import { AlertModule } from './alert/alert.module';
import { CRUDAlertModule } from './alert/crud-alert.module';
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
    AlertModule,
    FoodDiaryModule,
    TrainingDiaryModule,
    UserModule,
    TrainingModule,
    CRUDTrainingModule,
    OrderModule,
    CRUDOrderModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
