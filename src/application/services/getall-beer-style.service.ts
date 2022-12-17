import { GetAllBeerStyle } from "@/domain/usecases";
import { BeerStyle } from "@/domain/models";
import { BeerStyleRepository } from "@/application/interfaces";

export class GetAllBeerStyleService implements GetAllBeerStyle {
  constructor(private readonly beerStyleRepository: BeerStyleRepository) {}

  async getAll(): Promise<BeerStyle[]> {
    const beerStyle = await this.beerStyleRepository.findAll();

    return beerStyle;
  }
}
