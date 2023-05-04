import { PersonalTraining } from '@fit-friends-backend/shared-types';
import { PersonalTrainingStatus } from '@fit-friends-backend/shared-types';

export class PersonalTrainingEntity implements PersonalTraining {
  public _id: string;
  public initiator: string;
  public companion: string;
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
    const {_id, companionID, initiatorId, createdAt, changingStatusDate, status} = personalTraining;

    this._id = _id;
    this.companion = companionID;
    this.initiator = initiatorId;
    this.createdAt = createdAt;
    this.changingStatusDate = changingStatusDate;
    this.status = status;
  }

}
