import { GetAllBeerStyle } from "@/domain/usecases/beer-style";
import { serverError, ok } from "@/presentation/helpers";
import { IController, IHttpRequest, IHttpResponse } from "@/presentation/interfaces";

export class GetAllBeerStyleController implements IController {
  constructor(private readonly service: GetAllBeerStyle) {}

  async handle(_httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const beerStyle = await this.service.getAll();

      return ok(beerStyle);
    } catch (error) {
      return serverError();
    }
  }
}
