import { GetPlaylistByTemperature } from "@/domain/usecases/playlist";
import { badRequest, notFound, ok, serverError } from "@/presentation/helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidatorAdapter
} from "@/presentation/interfaces";

export class GetPlaylistByTemperatureController implements IController {
  constructor(
    private readonly service: GetPlaylistByTemperature,
    private readonly validator: IValidatorAdapter
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { query } = httpRequest;
      const isInvalid = this.validator.validate(query);

      if (isInvalid) return badRequest(isInvalid);

      const { temperature } = httpRequest.query;

      const result = await this.service.get(+temperature);

      if (!result) return notFound();

      return ok(result);
    } catch (error) {
      return serverError();
    }
  }
}
