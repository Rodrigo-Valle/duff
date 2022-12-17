import { BeerStyleRepository, SaveBeerStyleDTO } from "@/application/interfaces";
import { BeerStyle } from "@/domain/models";
import { DeleteResult } from "typeorm";

export const repositoryReturn = {
  id: "any_id",
  name: "any_name",
  minTemperature: 1,
  maxTemperature: 10
};

export const saveBeerStyleDTO = {
  name: "any_name",
  minTemperature: 1,
  maxTemperature: 10
};

export const throwError = (): never => {
  throw new Error();
};

export const makeDeleteResult = (): DeleteResult => new DeleteResult();

export const makeBeerStyleRepository = (): BeerStyleRepository => {
  class BeerStyleRepositoryStub implements BeerStyleRepository {
    async save(_saveBeerStyleDTO: SaveBeerStyleDTO): Promise<BeerStyle> {
      return await Promise.resolve(repositoryReturn);
    }

    async findAll(): Promise<BeerStyle[]> {
      return await Promise.resolve([repositoryReturn]);
    }

    async findOne(_id: string): Promise<BeerStyle | null> {
      return await Promise.resolve(repositoryReturn);
    }

    async remove(_id: string): Promise<DeleteResult> {
      const deleteResult = makeDeleteResult();
      deleteResult.affected = 1;
      return await Promise.resolve(deleteResult);
    }
  }

  return new BeerStyleRepositoryStub();
};
