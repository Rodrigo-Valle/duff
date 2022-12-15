import { BeerStyle } from "@/domain/models";

export interface IBeerStyleRepository {
  save: (addBeerStyleDTO: AddBeerStyleDTO) => Promise<BeerStyle>;
  findAll: () => Promise<BeerStyle[]>;
  findOne: (id: string) => Promise<BeerStyle | null>;
}

export interface AddBeerStyleDTO {
  name: string;
  minTemperature: number;
  maxTemperature: number;
}
