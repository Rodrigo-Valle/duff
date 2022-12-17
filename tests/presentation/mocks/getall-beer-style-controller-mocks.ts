import { BeerStyle } from "@/domain/models";
import { GetAllBeerStyle } from "@/domain/usecases";

export const getAllServiceResponse: BeerStyle[] = [
  {
    id: "1",
    name: "any_name",
    minTemperature: 1,
    maxTemperature: 10
  }
];

export const getAllRequest = {
  body: undefined
};

export const makeGetAllBeerStyleService = (): GetAllBeerStyle => {
  class GetAllBeerStyleService implements GetAllBeerStyle {
    async getAll(): Promise<BeerStyle[]> {
      return await Promise.resolve(getAllServiceResponse);
    }
  }
  return new GetAllBeerStyleService();
};
