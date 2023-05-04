import { Training } from '@fit-friends-backend/shared-types';

export class ShopTrainingEntity implements Training {
  public _id: string;
  public title: string;
  public preview: string;
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
    const {_id, title, preview, level, type, time, price, calories, description,
    gender, videoLink, rating, coach, special} = shopTraining;

    this._id = _id;
    this.title = title;
    this.preview = preview;
    this.level = level;
    this.type = type;
    this.time = time;
    this.price = price;
    this.calories = calories;
    this.description = description;
    this.gender = gender;
    this.videoLink = videoLink;
    this.rating = rating;
    this.coachId = coach;
    this.special = special;
  }

}
