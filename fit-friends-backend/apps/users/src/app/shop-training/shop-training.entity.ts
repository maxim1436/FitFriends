import { Training, User } from '@fit-friends-backend/shared-types';

export class ShopTrainingEntity implements Training {
  public _id: string;
  public title: string;
  public avatar: string;
  public level: string;
  public type: string;
  public time: string;
  public price: number;
  public calories: number;
  public description: string;
  public gender: string;
  public videoLink: string;
  public rating: number;
  public coachId: string;
  public special: boolean;

  constructor(shopTraining: Training) {
    this.fillEntity(shopTraining);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(shopTraining: Training) {
    this._id = shopTraining._id;
    this.title = shopTraining.title;
    this.avatar = shopTraining.avatar;
    this.level = shopTraining.level;
    this.type = shopTraining.type;
    this.time = shopTraining.time;
    this.price = shopTraining.price;
    this.calories = shopTraining.calories;
    this.description = shopTraining.description;
    this.gender = shopTraining.gender;
    this.videoLink = shopTraining.videoLink;
    this.rating = shopTraining.rating;
    this.coachId = shopTraining.coach;
    this.special = shopTraining.special;
  }

}
