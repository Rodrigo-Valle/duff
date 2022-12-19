import { DeleteBeerStyle } from "@/domain/usecases/beer-style";

export const deleteServiceResponse: number = 1;

export const deleteRequest = {
  params: {
    id: "any_id"
  }
};

export const makeDeleteBeerStyleService = (): DeleteBeerStyle => {
  class DeleteBeerStyleService implements DeleteBeerStyle {
    async delete(_id: string): Promise<number | null> {
      return await Promise.resolve(deleteServiceResponse);
    }
  }
  return new DeleteBeerStyleService();
};
