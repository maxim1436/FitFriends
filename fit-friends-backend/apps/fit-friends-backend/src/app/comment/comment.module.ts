import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { CommentModel, CommentSchema } from './comment.model';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../config/jwt.config';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { CRUDTrainingModule } from '../training/crud-training.module';
import { CommentController } from './comment.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CommentModel.name, schema: CommentSchema }
    ]),
    CommentModule,
    CRUDTrainingModule,
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    })
  ],
  controllers: [CommentController],
  providers: [CommentRepository, CommentService, JwtStrategy],
  exports: [CommentRepository, CommentService],
})

export class CommentModule {}
