import { IGetAllBeerStyleService } from "@/application/interfaces";
import { serverError, ok } from "@/presentation/helpers";
import { IController, IHttpRequest, IHttpResponse } from "@/presentation/interfaces";

export class GetAllBeerStyleController implements IController {
  constructor(private readonly beerStyleService: IGetAllBeerStyleService) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const beerStyle = await this.beerStyleService.getAll();

      return ok(beerStyle);
    } catch (error) {
      return serverError();
    }
  }
}
