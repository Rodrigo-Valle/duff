import { BeerStyle } from "@/domain/models";
import { GetBeerStyle } from "@/domain/usecases/beer-style";

export const getServiceResponse: BeerStyle = {
  id: "1",
  name: "any_name",
  minTemperature: 1,
  maxTemperature: 10
};

export const getRequest = {
  params: {
    id: "any_id"
  }
};

export const makeGetBeerStyleService = (): GetBeerStyle => {
  class GetBeerStyleService implements GetBeerStyle {
    async get(_id: string): Promise<BeerStyle | null> {
      return await Promise.resolve(getServiceResponse);
    }
  }
  return new GetBeerStyleService();
};
