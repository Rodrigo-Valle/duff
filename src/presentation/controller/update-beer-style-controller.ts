import { IUpdateBeerStyleService } from "@/application/interfaces";
import { serverError, ok, notFound, badRequest } from "@/presentation/helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidatorAdapter
} from "@/presentation/interfaces";

export class UpdateBeerStyleController implements IController {
  constructor(
    private readonly beerStyleService: IUpdateBeerStyleService,
    private readonly validator: IValidatorAdapter
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { body } = httpRequest;
      const { id } = httpRequest.params;

      const isInvalid = this.validator.validate(body);

      if (isInvalid) return badRequest(isInvalid);

      const beerStyle = await this.beerStyleService.update(body, id);

      if (!beerStyle) return notFound();

      return ok(beerStyle);
    } catch (error) {
      return serverError();
    }
  }
}
