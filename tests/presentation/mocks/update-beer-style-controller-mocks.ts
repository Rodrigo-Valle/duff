import { BeerStyle } from "@/domain/models";
import { IUpdateBeerStyleService, UpdateBeerStyleDTO } from "@/application/interfaces";

export const updateServiceResponseMock: BeerStyle = {
  id: "any_id",
  name: "any_name",
  minTemperature: 1,
  maxTemperature: 10
};

export const updateRequestMock = {
  params: {
    id: "any_id"
  },
  body: {
    name: "any_name",
    minTemperature: 1,
    maxTemeperature: 10
  }
};

export const makeUpdateBeerStyleService = (): IUpdateBeerStyleService => {
  class UpdateBeerStyleService implements IUpdateBeerStyleService {
    async update(_updateBeerStyle: UpdateBeerStyleDTO, _id: string): Promise<BeerStyle | null> {
      return await Promise.resolve(updateServiceResponseMock);
    }
  }
  return new UpdateBeerStyleService();
};
