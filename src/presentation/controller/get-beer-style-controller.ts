import { IGetBeerStyleService } from "@/application/interfaces";
import { serverError, ok, notFound } from "@/presentation/helpers";
import { IController, IHttpRequest, IHttpResponse } from "@/presentation/interfaces";

export class GetBeerStyleController implements IController {
  constructor(private readonly beerStyleService: IGetBeerStyleService) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { id } = httpRequest.params;

      const beerStyle = await this.beerStyleService.get(id);

      if (!beerStyle) return notFound();

      return ok(beerStyle);
    } catch (error) {
      return serverError();
    }
  }
}
