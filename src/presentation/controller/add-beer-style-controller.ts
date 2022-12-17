import { IAddBeerStyleService } from "@/application/interfaces";
import { MissinParamError, IsNotANumberError } from "@/presentation/errors";
import { badRequest, serverError, created } from "@/presentation/helpers";
import { IController, IHttpRequest, IHttpResponse } from "@/presentation/interfaces";

export class AddBeerStyleController implements IController {
  constructor(private readonly beerStyleService: IAddBeerStyleService) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const requiredFields = ["name", "minTemperature", "maxTemperature"];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissinParamError(field));
        }
      }

      const { minTemperature, maxTemperature } = httpRequest.body;

      if (isNaN(minTemperature)) return badRequest(new IsNotANumberError(minTemperature));
      if (isNaN(maxTemperature)) return badRequest(new IsNotANumberError(maxTemperature));

      const beerStyle = await this.beerStyleService.add(httpRequest.body);

      return created(beerStyle);
    } catch (error) {
      return serverError();
    }
  }
}
