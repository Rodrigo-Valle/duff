import { IBeerStyleRepository } from "@/domain/interfaces";
import { IDeleteBeerStyleService } from "@/application/interfaces";

export class DeleteBeerStyleService implements IDeleteBeerStyleService {
  constructor(private readonly beerStyleRepository: IBeerStyleRepository) {}

  async delete(id: string): Promise<number | null> {
    const deleteResult = await this.beerStyleRepository.remove(id);

    if (
      deleteResult.affected === null ||
      deleteResult.affected === undefined ||
      deleteResult.affected < 1
    )
      return null;

    return deleteResult.affected;
  }
}
