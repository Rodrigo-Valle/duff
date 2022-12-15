import { IBeerStyleRepository } from "@/domain/interfaces";
import { BeerStyle } from "@/domain/models";
import { IGetAllBeerStyleService } from "@/application/interfaces";

export class GetAllBeerStyleService implements IGetAllBeerStyleService {
  constructor(private readonly GetAllBeerStyleRepository: IBeerStyleRepository) {}

  async getAll(): Promise<BeerStyle[]> {
    const beerStyle = await this.GetAllBeerStyleRepository.getAll();

    return beerStyle;
  }
}
