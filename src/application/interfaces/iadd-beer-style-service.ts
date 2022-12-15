import { BeerStyle } from "@/domain/models";

export interface IAddBeerStyleService {
  add: (addBeerStyleDTO: AddBeerStyleDTO) => Promise<BeerStyle>;
}

export interface AddBeerStyleDTO {
  name: string;
  minTemperature: number;
  maxTemperature: number;
}
