import { Training } from "./training.interface";

export interface SeasonTicket {
  _id?: string;
  training: Training;
  tainingAmount: number;
  price: number;
}
