import { MissinParamError } from "@/presentation/errors";
import { badRequest, serverError, created } from "@/presentation/helpers";
import { IController, IHttpRequest, IHttpResponse } from "@/presentation/interfaces";
import { IsNotANumberError } from "../errors/is-nan";

export class AddBeerStyleController implements IController {
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

      return created("ok");
    } catch (error) {
      return serverError();
    }
  }
}
