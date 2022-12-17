import { IUpdateBeerStyleService } from "@/application/interfaces";
import { serverError, ok, badRequest, notFound } from "@/presentation/helpers";
import { IController, IHttpRequest, IHttpResponse } from "@/presentation/interfaces";
import { MissinParamError } from "@/presentation/errors";

export class UpdateBeerStyleController implements IController {
  constructor(private readonly beerStyleService: IUpdateBeerStyleService) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      if (!httpRequest.params?.id) return badRequest(new MissinParamError("id"));

      const { id } = httpRequest.params;

      const beerStyle = await this.beerStyleService.update(httpRequest.body, id);

      if (!beerStyle) return notFound();

      return ok(beerStyle);
    } catch (error) {
      return serverError();
    }
  }
}
