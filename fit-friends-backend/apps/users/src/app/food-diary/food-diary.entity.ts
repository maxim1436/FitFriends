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
    this._id = foodDiary._id;
    this.caloriesAmount = foodDiary.caloriesAmount;
    this.date = foodDiary.date;
    this.typeOfEating = foodDiary.typeOfEating;
    this.userId = foodDiary.user;
  }
}
