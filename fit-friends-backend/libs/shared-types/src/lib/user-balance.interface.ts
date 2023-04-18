import { Training } from "./training.interface";
import { SeasonTicket } from "./season-ticket.enterface";

export interface UserBalance {
  _id?: string;
  training: string;
  availableTrainingsAmount: number;
  seasonTicket: string;
  availableSeasonTicketsAmount: number;
}
