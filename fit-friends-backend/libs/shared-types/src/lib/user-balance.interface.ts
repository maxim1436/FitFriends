import { Training } from "./training.interface";
import { SeasonTicket } from "./season-ticket.enterface";

export interface UserBalance {
  _id?: string;
  training: Training;
  availableTrainingsAmount: number;
  seasonTicket: SeasonTicket;
  availableSeasonTicketsAmount: number;
}
