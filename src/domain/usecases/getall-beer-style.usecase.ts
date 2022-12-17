import { BeerStyle } from "@/domain/models";

export interface GetAllBeerStyle {
  getAll: () => Promise<BeerStyle[]>;
}
