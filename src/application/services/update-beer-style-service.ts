import { IBeerStyleRepository } from "@/domain/interfaces";
import { BeerStyle } from "@/domain/models";
import { UpdateBeerStyleDTO, IUpdateBeerStyleService } from "@/application/interfaces";

export class UpdateBeerStyleService implements IUpdateBeerStyleService {
  constructor(private readonly beerStyleRepository: IBeerStyleRepository) {}

  async update(updateBeerStyleDTO: UpdateBeerStyleDTO, id: string): Promise<BeerStyle | null> {
    let beerStyle = await this.beerStyleRepository.findOne(id);

    if (!beerStyle) return null;

    beerStyle.name = updateBeerStyleDTO.name ? updateBeerStyleDTO.name : beerStyle.name;
    beerStyle.minTemperature = updateBeerStyleDTO.minTemperature
      ? updateBeerStyleDTO.minTemperature
      : beerStyle.minTemperature;
    beerStyle.maxTemperature = updateBeerStyleDTO.maxTemperature
      ? updateBeerStyleDTO.maxTemperature
      : beerStyle.maxTemperature;

    beerStyle = await this.beerStyleRepository.save(beerStyle);

    return beerStyle;
  }
}
