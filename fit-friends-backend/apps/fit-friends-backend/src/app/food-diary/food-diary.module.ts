import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {FoodDiaryModel, FoodDiarySchema} from './food-diary.model';
import {FoodDiaryRepository} from './food-diary.repository';
import { FoodDiaryService } from './food-diary.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../config/jwt.config';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { FoodDiaryController } from './food-diary.controller';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FoodDiaryModel.name, schema: FoodDiarySchema }
    ]),
    FoodDiaryModule,
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    })
  ],
  controllers: [FoodDiaryController],
  providers: [FoodDiaryRepository, FoodDiaryService, JwtStrategy],
  exports: [FoodDiaryRepository, FoodDiaryService],
})

export class FoodDiaryModule {}
