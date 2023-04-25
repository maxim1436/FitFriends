import { Gym } from '@fit-friends-backend/shared-types';

export class GymEntity implements Gym {
  public _id: string;
  public title: string;
  public location: string;
  public verify: boolean;
  public parameters: string[];
  public photos: string[];
  public description: string;
  public price: number;
  public dateBirth: Date;

  constructor(shopTraining: Gym) {
    this.fillEntity(shopTraining);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(shopTraining: Gym) {
    this._id = shopTraining._id;
    this.title = shopTraining.title;
    this.location = shopTraining.location;
    this.verify = shopTraining.verify;
    this.parameters = shopTraining.parameters;
    this.photos = shopTraining.photos;
    this.description = shopTraining.description;
    this.price = shopTraining.price;
    this.dateBirth = shopTraining.dateBirth;
  }

}
