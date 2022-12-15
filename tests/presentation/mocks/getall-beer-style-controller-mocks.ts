import { BeerStyle } from "@/domain/models";
import { IGetAllBeerStyleService } from "@/application/interfaces";

export const getAllServiceResponseMock: BeerStyle[] = [
  {
    id: "1",
    name: "any_name",
    minTemperature: 1,
    maxTemperature: 10
  }
];

export const getAllRequestMock = {
  body: undefined
};

export const makeGetAllBeerStyleService = (): IGetAllBeerStyleService => {
  class GetAllBeerStyleService implements IGetAllBeerStyleService {
    async getAll(): Promise<BeerStyle[]> {
      return await Promise.resolve(getAllServiceResponseMock);
    }
  }
  return new GetAllBeerStyleService();
};
