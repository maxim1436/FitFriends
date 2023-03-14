
export interface Gym {
  _id?: string;
  title: string;
  location: string;
  verify: boolean;
  parameters: string[];
  photos: string[];
  description: string;
  price: number;
  dateBirth: Date;
}
