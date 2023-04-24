import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ShopAlertModel, ShopAlertSchema} from './shop-alert.model';
import {ShopAlertRepository} from './shop-alert.repository';
import { ShopAlertService } from './shop-alert.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../config/jwt.config';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { ShopUserModule } from '../shop-user/shop-user.module';
import { ShopAlertController } from './shop-alert.controller';
import { ShopAlertModule } from './shop-alert.module';

@Module({
  imports: [
    ShopAlertModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    })
  ],
  controllers: [ShopAlertController],
  providers: [ShopAlertService, JwtStrategy],
  exports: [ShopAlertService]
})
export class CRUDAlertModule {}
