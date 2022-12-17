import { BeerStyle } from "@/domain/models";

export interface GetBeerStyle {
  get: (id: string) => Promise<BeerStyle | null>;
}
