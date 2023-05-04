import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { PersonalTrainingModel, PersonalTrainingSchema } from './personal-training.model';
import { PersonalTrainingRepository } from './personal-training.repository';
import { PersonalTrainingService } from './personal-training.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../config/jwt.config';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { ShopUserModule } from '../shop-user/shop-user.module';
import { PersonalTrainingController } from './personal-training.controller';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PersonalTrainingModel.name, schema: PersonalTrainingSchema }
    ]),
    PersonalTrainingModule,
    ShopUserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    })
  ],
  controllers: [PersonalTrainingController],
  providers: [PersonalTrainingRepository, PersonalTrainingService, JwtStrategy],
  exports: [PersonalTrainingRepository, PersonalTrainingService],
})

export class PersonalTrainingModule {}
