import { IDeleteBeerStyleService } from "@/application/interfaces";
import { serverError, ok, notFound } from "@/presentation/helpers";
import { IController, IHttpRequest, IHttpResponse } from "@/presentation/interfaces";

export class DeleteBeerStyleController implements IController {
  constructor(private readonly beerStyleService: IDeleteBeerStyleService) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { id } = httpRequest.params;

      const beerStyle = await this.beerStyleService.delete(id);

      if (!beerStyle) return notFound();

      return ok({
        message: `Estilo(s) removido(s) com sucesso, quantidade removida: ${beerStyle}`
      });
    } catch (error) {
      return serverError();
    }
  }
}
