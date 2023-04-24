import { PersonalTraining } from '@fit-friends-backend/shared-types';
import { PersonalTrainingStatus } from '@fit-friends-backend/shared-types';

export class PersonalTrainingEntity implements PersonalTraining {
  public _id: string;
  public initiator: string;
  public anotherUser: string;
  public createdAt?: Date;
  public changingStatusDate: Date;
  public status: PersonalTrainingStatus;

  constructor(personalTraining: PersonalTraining) {
    this.fillEntity(personalTraining);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(personalTraining: PersonalTraining) {
    this._id = personalTraining._id;
    this.anotherUser = personalTraining.anotherUserID;
    this.initiator = personalTraining.initiatorId;
    this.createdAt = personalTraining.createdAt;
    this.changingStatusDate = personalTraining.changingStatusDate;
    this.status = personalTraining.status;
  }

}
