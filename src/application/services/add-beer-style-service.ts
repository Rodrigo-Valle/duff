import { IBeerStyleRepository } from "@/domain/interfaces";
import { BeerStyle } from "@/domain/models";
import { AddBeerStyleDTO, IAddBeerStyleService } from "@/application/interfaces";

export class AddBeerStyleService implements IAddBeerStyleService {
  constructor(private readonly addBeerStyleRepository: IBeerStyleRepository) {}

  async add(addBeerStyleDTO: AddBeerStyleDTO): Promise<BeerStyle> {
    const beerStyle = await this.addBeerStyleRepository.add(addBeerStyleDTO);

    return beerStyle;
  }
}
