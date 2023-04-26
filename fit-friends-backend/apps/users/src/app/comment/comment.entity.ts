import { Comment } from '@fit-friends-backend/shared-types';

export class CommentEntity implements Comment {
  public _id: string;
  public text: string;
  public rating: number;
  public dateBirth: Date;
  public userId: string;
  public trainingId: string;

  constructor(comment: Comment) {
    this.fillEntity(comment);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(comment: Comment) {
    this._id = comment._id;
    this.text = comment.text;
    this.rating = comment.rating;
    this.dateBirth = comment.dateBirth;
    this.userId = comment.user;
    this.trainingId = comment.training;
  }

}
