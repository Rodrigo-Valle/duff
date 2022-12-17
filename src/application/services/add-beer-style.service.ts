import { AddBeerStyleDTO, AddBeerStyle } from "@/domain/usecases";
import { BeerStyle } from "@/domain/models";
import { BeerStyleRepository } from "@/application/interfaces";

export class AddBeerStyleService implements AddBeerStyle {
  constructor(private readonly repository: BeerStyleRepository) {}

  async add(addBeerStyleDTO: AddBeerStyleDTO): Promise<BeerStyle> {
    const beerStyle = await this.repository.save(addBeerStyleDTO);

    return beerStyle;
  }
}
