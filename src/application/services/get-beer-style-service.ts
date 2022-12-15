import { IBeerStyleRepository } from "@/domain/interfaces";
import { BeerStyle } from "@/domain/models";
import { IGetBeerStyleService } from "@/application/interfaces";

export class GetBeerStyleService implements IGetBeerStyleService {
  constructor(private readonly beerStyleRepository: IBeerStyleRepository) {}

  async get(id: string): Promise<BeerStyle | null> {
    const beerStyle = await this.beerStyleRepository.findOne(id);

    return beerStyle;
  }
}
