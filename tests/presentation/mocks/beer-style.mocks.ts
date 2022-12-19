import { BeerStyle } from "@/domain/models";
import {
  AddBeerStyle,
  AddBeerStyleDTO,
  DeleteBeerStyle,
  GetAllBeerStyle,
  GetBeerStyle,
  UpdateBeerStyle,
  UpdateBeerStyleDTO
} from "@/domain/usecases/beer-style";

export const beerStyleResponse = {
  id: "1",
  name: "any_name",
  minTemperature: 1,
  maxTemperature: 10
};

export const addBSRequest = {
  body: {
    name: "any_name",
    minTemperature: "0",
    maxTemperature: "1"
  }
};

export const updateBSRequest = {
  params: {
    id: "any_id"
  },
  body: {
    name: "any_name",
    minTemperature: 1,
    maxTemeperature: 10
  }
};

export const requestWithId = {
  params: {
    id: "any_id"
  }
};

export const makeUpdateBeerStyleService = (): UpdateBeerStyle => {
  class UpdateBeerStyleService implements UpdateBeerStyle {
    async update(_updateBeerStyle: UpdateBeerStyleDTO, _id: string): Promise<BeerStyle | null> {
      return await Promise.resolve(beerStyleResponse);
    }
  }
  return new UpdateBeerStyleService();
};

export const makeAddBeerStyleService = (): AddBeerStyle => {
  class AddBeerStyleServiceStub implements AddBeerStyle {
    async add(_addBeerStyleDTO: AddBeerStyleDTO): Promise<BeerStyle> {
      return await Promise.resolve(beerStyleResponse);
    }
  }
  return new AddBeerStyleServiceStub();
};

export const makeDeleteBeerStyleService = (): DeleteBeerStyle => {
  class DeleteBeerStyleService implements DeleteBeerStyle {
    async delete(_id: string): Promise<number | null> {
      return await Promise.resolve(1);
    }
  }
  return new DeleteBeerStyleService();
};

export const makeGetBeerStyleService = (): GetBeerStyle => {
  class GetBeerStyleService implements GetBeerStyle {
    async get(_id: string): Promise<BeerStyle | null> {
      return await Promise.resolve(beerStyleResponse);
    }
  }
  return new GetBeerStyleService();
};

export const makeGetAllBeerStyleService = (): GetAllBeerStyle => {
  class GetAllBeerStyleService implements GetAllBeerStyle {
    async getAll(): Promise<BeerStyle[]> {
      return await Promise.resolve([beerStyleResponse]);
    }
  }
  return new GetAllBeerStyleService();
};
