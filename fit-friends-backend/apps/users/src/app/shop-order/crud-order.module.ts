import { Module } from '@nestjs/common';
import { ShopOrderController } from './shop-order.controller';
import { ShopOrderModule } from './shop-order.module';
import { ShopOrderService } from './shop-order.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../config/jwt.config';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ShopOrderModule,
    AuthModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
  ],
  controllers: [ShopOrderController],
  providers: [ShopOrderService, JwtStrategy],
})
export class CRUDOrderModule {}
