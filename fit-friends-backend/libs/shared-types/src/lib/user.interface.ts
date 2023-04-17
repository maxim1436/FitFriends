import { UserRole } from "./user-role.enum";
import { CoachSurvey } from "./coach-survey.interface";
import { UserSurvey } from "./user-survey.interface";

export interface User {
  _id?: string;
  email: string;
  firstname: string;
  avatar: string;
  passwordHash: string;
  userRole: UserRole;
  dateBirth: Date;
  createdAt?: Date;
  location: string;
  gender: string;
  friends: string[];
  friendsAsk: string[];
  coachSurvey?: CoachSurvey;
  userSurvey?: UserSurvey;
}
