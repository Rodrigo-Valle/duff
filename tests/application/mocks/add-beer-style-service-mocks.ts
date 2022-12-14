import { AddBeerStyleDTO, IBeerStyleRepository } from "@/domain/interfaces";
import { BeerStyle } from "@/domain/models";

export const repoReturn = {
  id: "any_id",
  name: "any_title",
  minTemperature: 0,
  maxTemperature: 10
};

export const addBeerStyleDTO = {
  name: "any_title",
  minTemperature: 0,
  maxTemperature: 10
};

export const throwError = (): never => {
  throw new Error();
};

export const makeBeerStyleRepository = (): IBeerStyleRepository => {
  class BeerStyleRepositoryStub implements IBeerStyleRepository {
    async add(addBeerStyleDTO: AddBeerStyleDTO): Promise<BeerStyle> {
      return await Promise.resolve(repoReturn);
    }
  }

  return new BeerStyleRepositoryStub();
};