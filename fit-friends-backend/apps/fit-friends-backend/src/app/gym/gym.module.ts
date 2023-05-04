import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { GymSchema, GymModel } from './gym.model';
import { GymRepository } from './gym.repository';
import { GymService } from './gym.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../config/jwt.config';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { GymController } from './gym.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GymModel.name, schema: GymSchema }
    ]),
    GymModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    })
  ],
  controllers: [GymController],
  providers: [GymRepository, GymService, JwtStrategy],
  exports: [GymRepository, GymService],
})

export class GymModule {}
