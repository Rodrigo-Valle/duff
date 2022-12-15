import { BeerStyle } from "@/domain/models";

export interface IGetBeerStyleService {
  get: (id: string) => Promise<BeerStyle | null>;
}
