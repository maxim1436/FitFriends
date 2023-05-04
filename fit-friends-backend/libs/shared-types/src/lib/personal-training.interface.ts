import { PersonalTrainingStatus } from "./personal-training-status.enum";

export interface PersonalTraining {
  _id?: string;
  initiatorId?: string;
  companionID?: string;
  createdAt?: Date;
  changingStatusDate: Date;
  status: PersonalTrainingStatus;
}
