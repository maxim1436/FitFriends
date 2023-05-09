import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderModule } from './order.module';
import { OrderService } from './order.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../config/jwt.config';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { CRUDTrainingModule } from '../training/crud-training.module';

@Module({
  imports: [
    OrderModule,
    UserModule,
    CRUDTrainingModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService, JwtStrategy],
  exports: [OrderService],
})
export class CRUDOrderModule {}
