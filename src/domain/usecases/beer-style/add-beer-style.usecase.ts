import { BeerStyle } from "@/domain/models";

export interface AddBeerStyle {
  add: (addBeerStyleDTO: AddBeerStyleDTO) => Promise<BeerStyle>;
}

export interface AddBeerStyleDTO {
  name: string;
  minTemperature: number;
  maxTemperature: number;
}
