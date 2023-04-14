import { TrainingDiary } from "@fit-friends-backend/shared-types";

export class TrainingDiaryEntity implements TrainingDiary {
  public _id?: string;
  public caloriesSpentAmount: number;
  public timeSpentAmount: string;
  public trainingId: string;
  public userId: string;
  public date: Date;

  constructor(trainingDiary: TrainingDiary) {
    this.fillEntity(trainingDiary);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(trainingDiary: TrainingDiary) {
    this._id = trainingDiary._id;
    this.caloriesSpentAmount = trainingDiary.caloriesSpentAmount;
    this.date = trainingDiary.date;
    this.timeSpentAmount = trainingDiary.timeSpentAmount;
    this.trainingId = trainingDiary.training;
    this.userId = trainingDiary.user;
  }
}
