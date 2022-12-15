import { BeerStyle } from "@/domain/models";
import { IGetBeerStyleService } from "@/application/interfaces";

export const getServiceResponseMock: BeerStyle = {
  id: "1",
  name: "any_name",
  minTemperature: 1,
  maxTemperature: 10
};

export const getRequestMock = {
  params: {
    id: "any_id"
  }
};

export const makeGetBeerStyleService = (): IGetBeerStyleService => {
  class GetBeerStyleService implements IGetBeerStyleService {
    async get(_id: string): Promise<BeerStyle | null> {
      return await Promise.resolve(getServiceResponseMock);
    }
  }
  return new GetBeerStyleService();
};
