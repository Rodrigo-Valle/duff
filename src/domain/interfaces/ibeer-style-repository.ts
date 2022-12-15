import { BeerStyle } from "@/domain/models";

export interface IBeerStyleRepository {
  save: (addBeerStyleDTO: SaveBeerStyleDTO) => Promise<BeerStyle>;
  findAll: () => Promise<BeerStyle[]>;
  findOne: (id: string) => Promise<BeerStyle | null>;
}

export interface SaveBeerStyleDTO {
  id?: string;
  name: string;
  minTemperature: number;
  maxTemperature: number;
}
