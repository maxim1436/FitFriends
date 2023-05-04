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
    const {_id, caloriesSpentAmount, date, timeSpentAmount, training, user} = trainingDiary
    this._id = _id;
    this.caloriesSpentAmount = caloriesSpentAmount;
    this.date = date;
    this.timeSpentAmount = timeSpentAmount;
    this.trainingId = training;
    this.userId = user;
  }
}
