
export interface UserSurvey {
  _id?: string;
  level: string;
  type: string[];
  time: string;
  caloriesToLose: number;
  caloriesLosePerDay: number;
  readyToTrain: boolean;
}
