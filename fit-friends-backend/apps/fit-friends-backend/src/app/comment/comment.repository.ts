import {CRUDRepository} from '@fit-friends-backend/core';
import { CommentEntity } from './comment.entity';
import { Comment } from '@fit-friends-backend/shared-types';
import {InjectModel} from '@nestjs/mongoose';
import { CommentModel } from './comment.model';
import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import { DEFAULT_COMMENT_COUNT } from './comment.constant';

@Injectable()
export class CommentRepository implements CRUDRepository<CommentEntity, string, Comment> {
  constructor(
    @InjectModel(CommentModel.name) private readonly commentModel: Model<CommentModel>) {
  }

  public async create(item: CommentEntity): Promise<Comment> {
    const newComment = new this.commentModel(item);
    return (await newComment.save()).populate(['userId', 'trainingId']);
  }

  public async findById(id: string): Promise<Comment> {
    return this.commentModel
      .findOne({_id: `${id}`})
      .populate(['userId', 'trainingId'])
      .exec();
  }

  public async update(id: string, item: CommentEntity): Promise<Comment> {
    return this.commentModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .populate(['userId', 'trainingId'])
      .exec();
  }

  public async destroy(id: string): Promise<void> {
    this.commentModel.deleteOne({_id: `${id}`});
  }

  public async findByFilters (id:string, count?: number): Promise<Comment[]> {

    if (count >= DEFAULT_COMMENT_COUNT) {
      const limit = DEFAULT_COMMENT_COUNT;
      return this.commentModel
      .find({
        trainingId: `${id}`,
      }, {}, {limit})
      .populate(['userId', 'trainingId'])
      .exec();
    } else {
      const limit = count;
      return this.commentModel
      .find({
        trainingId: `${id}`
      }, {}, {limit})
      .populate(['userId', 'trainingId'])
      .exec();
    }
  }

}
