import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ShopUserModel, ShopUserSchema} from './shop-user.model';
import {ShopUserRepository} from './shop-user.repository';
import { ShopUserService } from './shop-user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../config/jwt.config';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShopUserModel.name, schema: ShopUserSchema }
    ]),
    ShopUserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    })
  ],
  providers: [ShopUserRepository, ShopUserService, JwtStrategy],
  exports: [ShopUserRepository, ShopUserService],
})

export class ShopUserModule {}
