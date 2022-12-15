import { BeerStyle } from "@/domain/models";
import { DeleteResult } from "typeorm";

export interface IBeerStyleRepository {
  save: (addBeerStyleDTO: SaveBeerStyleDTO) => Promise<BeerStyle>;
  findAll: () => Promise<BeerStyle[]>;
  findOne: (id: string) => Promise<BeerStyle | null>;
  remove: (id: string) => Promise<DeleteResult>;
}

export interface SaveBeerStyleDTO {
  id?: string;
  name: string;
  minTemperature: number;
  maxTemperature: number;
}
