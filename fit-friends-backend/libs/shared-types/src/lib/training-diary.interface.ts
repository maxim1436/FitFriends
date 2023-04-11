import { Training } from "./training.interface";

export interface TrainingDiary {
  _id?: string;
  training: Training;
  caloriesSpentAmount: number;
  timeSpentAmount: string;
  date: Date;
}
