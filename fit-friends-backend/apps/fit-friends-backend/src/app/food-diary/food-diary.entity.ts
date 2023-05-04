import { FoodDiary, TypeOfEating } from "@fit-friends-backend/shared-types";

export class FoodDiaryEntity implements FoodDiary {
  public _id?: string;
  public caloriesAmount: number;
  public date: Date;
  public typeOfEating: TypeOfEating;
  public userId: string;

  constructor(foodDiary: FoodDiary) {
    this.fillEntity(foodDiary);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(foodDiary: FoodDiary) {
    const {_id, caloriesAmount, date, typeOfEating, user} = foodDiary;

    this._id = _id;
    this.caloriesAmount = caloriesAmount;
    this.date = date;
    this.typeOfEating = typeOfEating;
    this.userId = user;
  }
}
