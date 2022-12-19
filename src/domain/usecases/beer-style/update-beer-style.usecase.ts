import { BeerStyle } from "@/domain/models";

export interface UpdateBeerStyle {
  update: (updateBeerStyleDTO: UpdateBeerStyleDTO, id: string) => Promise<BeerStyle | null>;
}

export interface UpdateBeerStyleDTO {
  name?: string;
  minTemperature?: number;
  maxTemperature?: number;
}
