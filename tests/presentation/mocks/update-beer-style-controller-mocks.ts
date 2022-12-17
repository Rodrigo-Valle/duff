import { BeerStyle } from "@/domain/models";
import { UpdateBeerStyle, UpdateBeerStyleDTO } from "@/domain/usecases";

export const updateServiceResponse: BeerStyle = {
  id: "any_id",
  name: "any_name",
  minTemperature: 1,
  maxTemperature: 10
};

export const updateRequest = {
  params: {
    id: "any_id"
  },
  body: {
    name: "any_name",
    minTemperature: 1,
    maxTemeperature: 10
  }
};

export const makeUpdateBeerStyleService = (): UpdateBeerStyle => {
  class UpdateBeerStyleService implements UpdateBeerStyle {
    async update(_updateBeerStyle: UpdateBeerStyleDTO, _id: string): Promise<BeerStyle | null> {
      return await Promise.resolve(updateServiceResponse);
    }
  }
  return new UpdateBeerStyleService();
};
