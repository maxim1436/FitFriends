import { Module } from '@nestjs/common';
import { AlertService } from './alert.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../config/jwt.config';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { AlertModule } from './alert.module';

@Module({
  imports: [
    AlertModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    })
  ],
  controllers: [],
  providers: [AlertService, JwtStrategy],
  exports: [AlertService]
})
export class CRUDAlertModule {}
