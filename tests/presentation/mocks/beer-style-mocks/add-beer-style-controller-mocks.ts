import { BeerStyle } from "@/domain/models";
import { AddBeerStyleDTO, AddBeerStyle } from "@/domain/usecases/beer-style";

export const addBeerStyleServiceResponse: BeerStyle = {
  id: "1",
  name: "any_name",
  minTemperature: 1,
  maxTemperature: 10
};

export const addBeerStyleRequest = {
  body: {
    name: "any_name",
    minTemperature: "0",
    maxTemperature: "1"
  }
};

export const makeAddBeerStyleService = (): AddBeerStyle => {
  class AddBeerStyleServiceStub implements AddBeerStyle {
    async add(_addBeerStyleDTO: AddBeerStyleDTO): Promise<BeerStyle> {
      return await Promise.resolve(addBeerStyleServiceResponse);
    }
  }
  return new AddBeerStyleServiceStub();
};
