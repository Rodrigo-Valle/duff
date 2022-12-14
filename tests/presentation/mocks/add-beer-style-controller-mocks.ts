import { BeerStyle } from "@/domain/models";
import { AddBeerStyleDTO, IAddBeerStyleService } from "@/application/interfaces";

export const serviceResponseMock: BeerStyle = {
  id: "1",
  name: "any_name",
  minTemperature: 1,
  maxTemperature: 10
};

export const httpRequestMock = {
  body: {
    name: "any_name",
    minTemperature: "0",
    maxTemperature: "1"
  }
};

export const makeAddBeerStyleService = (): IAddBeerStyleService => {
  class AddBeerStyleServiceStub implements IAddBeerStyleService {
    async add(_addBeerStyleDTO: AddBeerStyleDTO): Promise<BeerStyle> {
      return await Promise.resolve(serviceResponseMock);
    }
  }
  return new AddBeerStyleServiceStub();
};
