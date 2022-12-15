import { IBeerStyleRepository } from "@/domain/interfaces";
import { BeerStyle } from "@/domain/models";
import { AddBeerStyleDTO, IAddBeerStyleService } from "@/application/interfaces";

export class AddBeerStyleService implements IAddBeerStyleService {
  constructor(private readonly beerStyleRepository: IBeerStyleRepository) {}

  async add(addBeerStyleDTO: AddBeerStyleDTO): Promise<BeerStyle> {
    const beerStyle = await this.beerStyleRepository.save(addBeerStyleDTO);

    return beerStyle;
  }
}
