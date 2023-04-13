import { TypeOfEating } from "./type-of-eating.enum";

export interface FoodDiary {
  _id?: string;
  caloriesAmount: number;
  date: Date;
  typeOfEating: TypeOfEating;
  user?: string;
}

