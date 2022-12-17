import { BeerStyle } from "@/domain/models";
import { UpdateBeerStyleDTO, UpdateBeerStyle } from "@/domain/usecases";
import { BeerStyleRepository } from "@/application/interfaces";

export class UpdateBeerStyleService implements UpdateBeerStyle {
  constructor(private readonly repository: BeerStyleRepository) {}

  async update(updateBeerStyleDTO: UpdateBeerStyleDTO, id: string): Promise<BeerStyle | null> {
    let beerStyle = await this.repository.findOne(id);

    if (!beerStyle) return null;

    beerStyle = await this.repository.save(this.mapBeerStyleToSave(updateBeerStyleDTO, beerStyle));

    return beerStyle;
  }

  private mapBeerStyleToSave(
    updateBeerStyleDTO: UpdateBeerStyleDTO,
    beerStyle: BeerStyle
  ): BeerStyle {
    beerStyle.name = updateBeerStyleDTO.name ? updateBeerStyleDTO.name : beerStyle.name;

    beerStyle.minTemperature = updateBeerStyleDTO.minTemperature
      ? updateBeerStyleDTO.minTemperature
      : beerStyle.minTemperature;

    beerStyle.maxTemperature = updateBeerStyleDTO.maxTemperature
      ? updateBeerStyleDTO.maxTemperature
      : beerStyle.maxTemperature;

    return beerStyle;
  }
}
