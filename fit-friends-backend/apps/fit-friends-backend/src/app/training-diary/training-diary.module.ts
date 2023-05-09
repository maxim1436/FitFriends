import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { TrainingDiaryModel, TrainingDiarySchema } from './training-diary.model';
import { TrainingDiaryRepository } from './training-diary.repository';
import { TrainingDiaryService } from './training-diary.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../config/jwt.config';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { CRUDOrderModule } from '../order/crud-order.module';
import { TrainingDiaryController } from './training-diary.controller';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TrainingDiaryModel.name, schema: TrainingDiarySchema }
    ]),
    TrainingDiaryModule,
    UserModule,
    CRUDOrderModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    })
  ],
  controllers: [TrainingDiaryController],
  providers: [TrainingDiaryRepository, TrainingDiaryService, JwtStrategy],
  exports: [TrainingDiaryRepository, TrainingDiaryService],
})

export class TrainingDiaryModule {}
