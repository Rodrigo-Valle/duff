import { DeleteBeerStyle } from "@/domain/usecases/beer-style";
import { serverError, ok, notFound } from "@/presentation/helpers";
import { IController, IHttpRequest, IHttpResponse } from "@/presentation/interfaces";

export class DeleteBeerStyleController implements IController {
  constructor(private readonly service: DeleteBeerStyle) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { id } = httpRequest.params;

      const beerStyle = await this.service.delete(id);

      if (!beerStyle) return notFound();

      return ok({
        message: "Estilo removido com sucesso"
      });
    } catch (error) {
      return serverError();
    }
  }
}
