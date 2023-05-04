import { Module } from '@nestjs/common';
import { ShopAlertService } from './shop-alert.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../config/jwt.config';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
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
  controllers: [],
  providers: [ShopAlertService, JwtStrategy],
  exports: [ShopAlertService]
})
export class CRUDAlertModule {}
