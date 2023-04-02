import { Module } from '@nestjs/common';
import { ShopTrainingController } from './shop-training.controller';
import { ShopTrainingModule } from './shop-training.module';
import { ShopTrainingService } from './shop-training.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../config/jwt.config';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ShopTrainingModule,
    AuthModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
  ],
  controllers: [ShopTrainingController],
  providers: [ShopTrainingService, JwtStrategy],
})
export class CRUDTrainingModule {}
