import { User } from "./user.interface";

export interface Training {
  _id?: string;
  title: string;
  preview: string;
  level: string;
  type: string;
  time: string;
  price: number;
  calories: number;
  description: string;
  gender: string;
  videoLink: string;
  rating: number;
  coach?: string;
  special: boolean;
}
