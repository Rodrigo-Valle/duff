import { BeerStyle } from "@/domain/models";

export interface IBeerStyleRepository {
  add: (addBeerStyleDTO: AddBeerStyleDTO) => Promise<BeerStyle>;
  getAll: () => Promise<BeerStyle[]>;
  get: (id: string) => Promise<BeerStyle | null>;
}

export interface AddBeerStyleDTO {
  name: string;
  minTemperature: number;
  maxTemperature: number;
}
