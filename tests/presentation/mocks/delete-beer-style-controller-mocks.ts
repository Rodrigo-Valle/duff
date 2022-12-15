import { IDeleteBeerStyleService } from "@/application/interfaces";

export const deleteServiceResponseMock: number = 1;

export const deleteRequestMock = {
  params: {
    id: "any_id"
  }
};

export const makeDeleteBeerStyleService = (): IDeleteBeerStyleService => {
  class DeleteBeerStyleService implements IDeleteBeerStyleService {
    async delete(_id: string): Promise<number | null> {
      return await Promise.resolve(deleteServiceResponseMock);
    }
  }
  return new DeleteBeerStyleService();
};
