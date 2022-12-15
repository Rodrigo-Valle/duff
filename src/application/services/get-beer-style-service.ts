import { IBeerStyleRepository } from "@/domain/interfaces";
import { BeerStyle } from "@/domain/models";
import { IGetBeerStyleService } from "@/application/interfaces";

export class GetBeerStyleService implements IGetBeerStyleService {
  constructor(private readonly GetBeerStyleRepository: IBeerStyleRepository) {}

  async get(id: string): Promise<BeerStyle | null> {
    const beerStyle = await this.GetBeerStyleRepository.get(id);

    return beerStyle;
  }
}
