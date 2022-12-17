import { IGetBeerStyleService } from "@/application/interfaces";
import { serverError, ok, badRequest, notFound } from "@/presentation/helpers";
import { IController, IHttpRequest, IHttpResponse } from "@/presentation/interfaces";
import { MissinParamError } from "../errors";

export class GetBeerStyleController implements IController {
  constructor(private readonly beerStyleService: IGetBeerStyleService) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      if (!httpRequest.params?.id) return badRequest(new MissinParamError("id"));

      const { id } = httpRequest.params;

      const beerStyle = await this.beerStyleService.get(id);

      if (!beerStyle) return notFound();

      return ok(beerStyle);
    } catch (error) {
      return serverError();
    }
  }
}
