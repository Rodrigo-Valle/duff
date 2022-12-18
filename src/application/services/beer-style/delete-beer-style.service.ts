import { DeleteBeerStyle } from "@/domain/usecases/beer-style";
import { BeerStyleRepository } from "@/application/interfaces";

export class DeleteBeerStyleService implements DeleteBeerStyle {
  constructor(private readonly repository: BeerStyleRepository) {}

  async delete(id: string): Promise<number | null> {
    const deleteResult = await this.repository.remove(id);

    if (
      deleteResult.affected === null ||
      deleteResult.affected === undefined ||
      deleteResult.affected < 1
    )
      return null;

    return deleteResult.affected;
  }
}
