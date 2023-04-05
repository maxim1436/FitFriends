import { Module } from '@nestjs/common';
import { ShopTrainingController } from './shop-training.controller';
import { ShopTrainingModule } from './shop-training.module';
import { ShopTrainingService } from './shop-training.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../config/jwt.config';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { ShopUserModule } from '../shop-user/shop-user.module';

@Module({
  imports: [
    ShopTrainingModule,
    ShopUserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
  ],
  controllers: [ShopTrainingController],
  providers: [ShopTrainingService, JwtStrategy],
  exports: [ShopTrainingService]
})
export class CRUDTrainingModule {}
