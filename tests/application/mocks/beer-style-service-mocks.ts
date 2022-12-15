import { SaveBeerStyleDTO, IBeerStyleRepository } from "@/domain/interfaces";
import { BeerStyle } from "@/domain/models";

export const repoReturn = {
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

export const makeBeerStyleRepository = (): IBeerStyleRepository => {
  class BeerStyleRepositoryStub implements IBeerStyleRepository {
    async save(_saveBeerStyleDTO: SaveBeerStyleDTO): Promise<BeerStyle> {
      return await Promise.resolve(repoReturn);
    }

    async findAll(): Promise<BeerStyle[]> {
      return await Promise.resolve([repoReturn]);
    }

    async findOne(_id: string): Promise<BeerStyle | null> {
      return await Promise.resolve(repoReturn);
    }
  }

  return new BeerStyleRepositoryStub();
};
