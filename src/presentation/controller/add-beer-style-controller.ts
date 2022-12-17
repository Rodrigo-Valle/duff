import { IAddBeerStyleService } from "@/application/interfaces";
import { badRequest, serverError, created } from "@/presentation/helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidatorAdapter
} from "@/presentation/interfaces";

export class AddBeerStyleController implements IController {
  constructor(
    private readonly beerStyleService: IAddBeerStyleService,
    private readonly validator: IValidatorAdapter
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { body } = httpRequest;
      const isInvalid = this.validator.validate(body);

      if (isInvalid) return badRequest(isInvalid);

      const beerStyle = await this.beerStyleService.add(body);

      return created(beerStyle);
    } catch (error) {
      return serverError();
    }
  }
}
