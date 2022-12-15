import { BeerStyle } from "@/domain/models";

export interface IGetAllBeerStyleService {
  getAll: () => Promise<BeerStyle[]>;
}
