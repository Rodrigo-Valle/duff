import { BeerStyle } from "@/domain/models";
import { DeleteResult } from "typeorm";

export interface BeerStyleRepository {
  save: (addBeerStyleDTO: SaveBeerStyleDTO) => Promise<BeerStyle>;
  findAll: () => Promise<BeerStyle[]>;
  findOne: (id: string) => Promise<BeerStyle | null>;
  findByTemperatureAverage: (temperature: number) => Promise<BeerStyle>;
  remove: (id: string) => Promise<DeleteResult>;
}

export interface SaveBeerStyleDTO {
  id?: string;
  name: string;
  minTemperature: number;
  maxTemperature: number;
}
