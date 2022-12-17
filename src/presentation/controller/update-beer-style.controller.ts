import { UpdateBeerStyle } from "@/domain/usecases";
import { serverError, ok, notFound, badRequest } from "@/presentation/helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidatorAdapter
} from "@/presentation/interfaces";

export class UpdateBeerStyleController implements IController {
  constructor(
    private readonly service: UpdateBeerStyle,
    private readonly validator: IValidatorAdapter
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { body } = httpRequest;
      const { id } = httpRequest.params;

      const isInvalid = this.validator.validate(body);

      if (isInvalid) return badRequest(isInvalid);

      const beerStyle = await this.service.update(body, id);

      if (!beerStyle) return notFound();

      return ok(beerStyle);
    } catch (error) {
      return serverError();
    }
  }
}
