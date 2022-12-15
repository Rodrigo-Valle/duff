import { BeerStyle } from "@/domain/models";
import { AddBeerStyleDTO, IAddBeerStyleService } from "@/application/interfaces";

export const addBeerStyleServiceResponseMock: BeerStyle = {
  id: "1",
  name: "any_name",
  minTemperature: 1,
  maxTemperature: 10
};

export const addBeerStyleRequestMock = {
  body: {
    name: "any_name",
    minTemperature: "0",
    maxTemperature: "1"
  }
};

export const makeAddBeerStyleService = (): IAddBeerStyleService => {
  class AddBeerStyleServiceStub implements IAddBeerStyleService {
    async add(_addBeerStyleDTO: AddBeerStyleDTO): Promise<BeerStyle> {
      return await Promise.resolve(addBeerStyleServiceResponseMock);
    }
  }
  return new AddBeerStyleServiceStub();
};
