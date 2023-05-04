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

  constructor(gym: Gym) {
    this.fillEntity(gym);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(gym: Gym) {
    const {_id, title, location, verify, parameters, photos, description, dateBirth, price} = gym;
    this._id = _id;
    this.title = title;
    this.location = location;
    this.verify = verify;
    this.parameters = parameters;
    this.photos = photos;
    this.description = description;
    this.price = price;
    this.dateBirth = dateBirth;
  }

}
