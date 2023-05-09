import { UserRole } from '@fit-friends-backend/shared-types';
import { fillObject } from '@fit-friends-backend/core';
import { TrainingRdo } from '../training/rdo/training.rdo';
import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UserService } from '../user/user.service';
import { TrainingService } from '../training/training.service';
import { CommentMessage } from './comment.constant';
import dayjs from 'dayjs';

@Injectable()
export class CommentService {
  constructor(
    private readonly CommentRepository: CommentRepository,
    private readonly UserService: UserService,
    private readonly TrainingService: TrainingService,
  ) {}

  async create(dto: CreateCommentDto, userEmail: string) {

    const existUser = await this.UserService.findByEmail(userEmail);

    if (!existUser) {
      throw new HttpException(CommentMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    if (existUser.userRole === UserRole.Coach) {
      throw new HttpException(CommentMessage.USER_ROLE_WRONG, HttpStatus.CONFLICT);
    }
    const {text, rating, trainingId} = dto;

    const existTraining = await this.TrainingService.getTraining(trainingId);

    if (!existTraining) {
      throw new HttpException(CommentMessage.TRAINING_NOT_FOUND, HttpStatus.CONFLICT);
    }

    const comment = {
      user: existUser._id, training: existTraining._id,
      text, rating, dateBirth: dayjs(new Date()).toDate(),
    };

    const commentEntity = await new CommentEntity(comment);

      const createdComment = await this.CommentRepository
      .create(commentEntity);

    const commentsArray = await this.CommentRepository.findByFilters(trainingId, 10000);

    const newRating = ((existTraining.rating * (commentsArray.length + 1)) + rating) / (commentsArray.length + 2)

    await this.TrainingService
      .update(existTraining._id.toString(), {rating: newRating}, fillObject(TrainingRdo, existTraining).coachId.email);

    return createdComment;
  }

  async getComment(id: string) {
    const existComment = await this.CommentRepository.findById(id);

    if (!existComment) {
      throw new HttpException(CommentMessage.COMMENT_NOT_FOUND, HttpStatus.CONFLICT);
    }
    return existComment;
  }

  async getSomeComments(userEmail: string, trainingId: string, count?: number ) {

    const existUser = await this.UserService.findByEmail(userEmail);

    if (!existUser) {
      throw new HttpException(CommentMessage.USER_NOT_FOUND, HttpStatus.CONFLICT);
    }

    const existTraining = await this.TrainingService.getTraining(trainingId);

    if (!existTraining) {
      throw new HttpException(CommentMessage.TRAINING_NOT_FOUND, HttpStatus.CONFLICT);
    }

    return this.CommentRepository.findByFilters(trainingId, count);
  }
}
