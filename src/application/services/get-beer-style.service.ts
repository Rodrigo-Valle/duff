import { GetBeerStyle } from "@/domain/usecases";
import { BeerStyle } from "@/domain/models";
import { BeerStyleRepository } from "@/application/interfaces";

export class GetBeerStyleService implements GetBeerStyle {
  constructor(private readonly repository: BeerStyleRepository) {}

  async get(id: string): Promise<BeerStyle | null> {
    const beerStyle = await this.repository.findOne(id);

    return beerStyle;
  }
}
