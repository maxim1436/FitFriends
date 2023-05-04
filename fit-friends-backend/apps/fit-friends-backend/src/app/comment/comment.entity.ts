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
    const {_id, text, rating, dateBirth, user, training} = comment;

    this._id = _id;
    this.text = text;
    this.rating = rating;
    this.dateBirth = dateBirth;
    this.userId = user;
    this.trainingId = training;
  }

}
